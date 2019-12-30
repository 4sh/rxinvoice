package rxinvoice.service.invoice;

import com.google.common.base.Joiner;
import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import com.google.common.base.Strings;
import com.google.common.collect.Collections2;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.eventbus.EventBus;
import com.mongodb.QueryBuilder;
import org.bson.types.ObjectId;
import org.joda.time.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.Status;
import restx.WebException;
import restx.factory.Component;
import restx.http.HttpStatus;
import restx.jongo.JongoCollection;
import rxinvoice.AppModule;
import rxinvoice.domain.Blob;
import rxinvoice.domain.invoice.*;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.User;
import rxinvoice.jongo.MoreJongos;
import rxinvoice.rest.BlobService;
import rxinvoice.rest.InvoiceSearchFilter;
import rxinvoice.rest.events.InvoiceUpdatedEvent;
import rxinvoice.service.company.CompanyService;

import javax.inject.Named;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;
import static rxinvoice.domain.invoice.Status.*;
import static rxinvoice.domain.invoice.Status.WAITING_VALIDATION;
import static rxinvoice.utils.MoreJ8Preconditions.checkPresent;

@Component
public class InvoiceService {

    private static final Logger logger = LoggerFactory.getLogger(InvoiceService.class);

    private final JongoCollection invoices;

    private final BlobService blobService;
    private final CompanyService companyService;

    private final EventBus eventBus;

    public InvoiceService(@Named("invoices") JongoCollection invoices,
                          BlobService blobService,
                          CompanyService companyService,
                          EventBus eventBus) {
        this.invoices = invoices;
        this.blobService = blobService;
        this.companyService = companyService;
        this.eventBus = eventBus;
    }

    public Invoice createInvoice(Invoice invoice) {
        if (invoice.getSeller() == null) {
            User user = AppModule.currentUser();
            if (user.getPrincipalRoles().contains(SELLER)) {
                invoice.setSeller(companyService.findCompanyByKey(user.getCompanyRef()).get());
            }
        }
        // Check that invoice reference is not already used by another invoice.
        if (!Strings.isNullOrEmpty(invoice.getReference())) {
            boolean exist = findInvoices(new InvoiceSearchFilter().setReference(Optional.of(invoice.getReference())))
                    .iterator().hasNext();
            if (exist) {
                throw new WebException(String.format("Invoice reference %s is already used.", invoice.getReference()));
            }
        }

        updateAmounts(invoice);

        invoices.get().save(invoice);
        if (null != eventBus) {
            eventBus.post(new InvoiceUpdatedEvent(invoice));
            eventBus.post(rxinvoice.domain.Activity.newCreate(invoice, AppModule.currentUser()));
        }
        return invoice;
    }


    public Invoice updateInvoice(Invoice invoice) {
        Optional<Invoice> invoiceByKey = findInvoiceByKey(invoice.getKey());
        if (!invoiceByKey.isPresent()) {
            throw new WebException(HttpStatus.NOT_FOUND);
        }

        User user = AppModule.currentUser();
        Invoice invoiceFromDB = invoiceByKey.get();
        checkCanEditInvoice(invoiceFromDB, user);

        List<Blob> attachments = invoiceFromDB.getAttachments();
        List<Blob> newAttachments = invoice.getAttachments();

        Collection<Blob> attachmentsToRemove = Collections2.filter(attachments, Predicates.not(Predicates.in(newAttachments)));

        if (!attachmentsToRemove.isEmpty()) {
            for (Blob blob : attachmentsToRemove) {
                blobService.definitiveDelete(blob.getId());
            }
        }

        updateAmounts(invoice);

        if (invoice.getStatus() != invoiceFromDB.getStatus()) {
            // as client doesn't supply status changes we set it from the database before adding the new status change.
            invoice.setStatusChanges(invoiceFromDB.getStatusChanges());
            invoice.addStatusChange(invoiceFromDB.getStatus(), user, invoice.getComment());
        }

        invoices.get().save(invoice);
        if (null != eventBus) {
            eventBus.post(new InvoiceUpdatedEvent(invoice));
            eventBus.post(rxinvoice.domain.Activity.newUpdate(invoiceByKey.get(), AppModule.currentUser()));
        }

        if (invoice.getStatus() != invoiceFromDB.getStatus()) {
            handleStatusChange(invoice);
        }
        return invoice;
    }

    private void handleStatusChange(Invoice invoice) {
        if (invoice.getBuyer() == null || invoice.getBuyer().getKey() == null) {
            return;
        }

        Optional<Company> buyerOpt = companyService.findCompanyByKey(invoice.getBuyer().getKey());
        if (!buyerOpt.isPresent()) {
            logger.warn("unable to find buyer for invoice {}", invoice);
            return;
        }

        Company buyer = buyerOpt.get();
        if (invoice.getStatus() == SENT) {
            sendInvoice(invoice, buyer);
        } else if (invoice.getStatus() == PAID) {
            payInvoice(invoice, buyer);
        }
    }

    private void payInvoice(Invoice invoice, Company buyer) {
        buyer.setLastPaymentDate(DateTime.now());
        buyer.setLastPaidInvoice(new InvoiceInfo(invoice));
        companyService.updateCompany(buyer);
    }

    private void sendInvoice(Invoice invoice, Company buyer) {
        buyer.setLastSendDate(DateTime.now());
        buyer.setLastSentInvoice(new InvoiceInfo(invoice));
        companyService.updateCompany(buyer);
        this.invoices.get().update(new ObjectId(invoice.getKey())).with("{$set: {sentDate: #}}", DateTime.now().toDate());
    }

    public Iterable<Invoice> findInvoices(InvoiceSearchFilter invoiceSearchFilter) {
        User user = AppModule.currentUser();

        QueryBuilder builder = QueryBuilder.start();

        if (!user.getPrincipalRoles().contains(ADMIN)) {
            builder.or(
                    QueryBuilder.start("seller._id").is(new ObjectId(user.getCompanyRef())).get(),
                    QueryBuilder.start("buyer._id").is(new ObjectId(user.getCompanyRef())).get()
            );
        }

        if (invoiceSearchFilter.getStartDate().isPresent()) {
            Date start = LocalDate.parse(invoiceSearchFilter.getStartDate().get()).toDateTime(LocalTime.MIDNIGHT).toDate();

            builder.and("date").greaterThanEquals(start);
        }

        if (invoiceSearchFilter.getEndDate().isPresent()) {
            Date end = LocalDate.parse(invoiceSearchFilter.getEndDate().get()).toDateTime(LocalTime.MIDNIGHT)
                    .withHourOfDay(23)
                    .withMinuteOfHour(59)
                    .withSecondOfMinute(59)
                    .withMillisOfSecond(999)
                    .toDate();

            builder.and("date").lessThanEquals(end);
        }

        if (invoiceSearchFilter.getStatuses().isPresent()) {
            String[] statusList = invoiceSearchFilter.getStatuses().get().split(",");
            builder.and("status").in(statusList);
        }

        if (invoiceSearchFilter.getBuyerRef().isPresent()) {
            builder.and("buyer._id").is(new ObjectId(invoiceSearchFilter.getBuyerRef().get()));
        }

        if (invoiceSearchFilter.getKind().isPresent()) {
            builder.and("kind").is(invoiceSearchFilter.getKind().get());
        }

        if (invoiceSearchFilter.getQuery().isPresent()) {
            builder.and(QueryBuilder.start().or(
                    QueryBuilder.start("object").is(MoreJongos.containsIgnoreCase(invoiceSearchFilter.getQuery().get())).get(),
                    QueryBuilder.start("reference").is(MoreJongos.containsIgnoreCase(invoiceSearchFilter.getQuery().get())).get())
                    .get());
        }

        if (invoiceSearchFilter.getReference().isPresent()) {
            builder.and("reference").is(MoreJongos.containsIgnoreCase(invoiceSearchFilter.getReference().get()));
        }

        return invoices.get().find(builder.get().toString()).as(Invoice.class);
    }

    public Optional<Invoice> findInvoiceByKey(String key) {
        String referencePrefix = "REF-";
        Optional<Invoice> invoice;

        if (key.startsWith(referencePrefix)) {
            invoice = Optional.ofNullable(invoices.get()
                    .findOne("{ reference : # }", key.substring(referencePrefix.length())).as(Invoice.class));
        } else {
            invoice = Optional.ofNullable(invoices.get().findOne(new ObjectId(key)).as(Invoice.class));
        }

        if (invoice.isPresent()) {
            User user = AppModule.currentUser();
            if (!user.getPrincipalRoles().contains(ADMIN)) {
                if (((invoice.get().getSeller() == null || !user.getCompanyRef().equals(invoice.get().getSeller().getKey())))
                        && ((invoice.get().getBuyer() == null || !user.getCompanyRef().equals(invoice.get().getBuyer().getKey())))) {
                    return Optional.empty();
                }
            }
        }
        return invoice;
    }

    public Iterable<Invoice> findInvoicesByBuyer(String buyerKey) {
        return this.invoices.get().find("{ buyer._id: #}", new ObjectId(buyerKey)).as(Invoice.class);
    }

    public Iterable<Invoice> findToPrepareInvoices() {
        QueryBuilder builder = QueryBuilder.start();

        User user = AppModule.currentUser();

        if (!user.getPrincipalRoles().contains(ADMIN)) {
            builder.or(
                    QueryBuilder.start("seller._id").is(new ObjectId(user.getCompanyRef())).get(),
                    QueryBuilder.start("buyer._id").is(new ObjectId(user.getCompanyRef())).get()
            );
        }

        builder.and("status").is("DRAFT");
        builder.and("date").lessThan(LocalDateTime.now().plusDays(8).toDate());

        return invoices.get().find(builder.get().toString()).as(Invoice.class);
    }

    public List<Invoice> findTasks(String maxDate) {
        Iterable<Invoice> invoices = findInvoices(
                new InvoiceSearchFilter()
                        .setEndDate(Optional.of(maxDate))
                        .setStatuses(Optional.of(Joiner.on(", ").join(Lists.newArrayList(DRAFT, WAITING_VALIDATION, SENT)))));

        final DateTime parsedMaxDate = LocalDate.parse(maxDate).toDateTime(LocalTime.MIDNIGHT)
                .withHourOfDay(23)
                .withMinuteOfHour(59)
                .withSecondOfMinute(59)
                .withMillisOfSecond(999);

        return Lists.newLinkedList(Iterables.filter(invoices, new Predicate<Invoice>() {
            @Override
            public boolean apply(Invoice invoice) {
                return !invoice.getStatus().equals(SENT) || Days.daysBetween(invoice.getDate(), parsedMaxDate).getDays() > 45;
            }
        }));
    }

    public void computeMetrics() {
        for (Invoice invoice : invoices.get().find().as(Invoice.class)) {
            updateAmounts(invoice);
            invoices.get().save(invoice);
        }
    }

    public Status deleteInvoice(String key) {
        Optional<Invoice> invoice = findInvoiceByKey(key);
        if (invoice.isPresent()) {
            invoices.get().remove(new ObjectId(key));
            if (null != eventBus) {
                eventBus.post(new InvoiceUpdatedEvent(invoice.get()));
                eventBus.post(rxinvoice.domain.Activity.newDelete(invoice.get(), AppModule.currentUser()));
            }
            return Status.of("deleted");
        } else {
            throw new WebException(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteInvoice(String invoiceId, String attachmentId) {
        Invoice invoice = checkPresent(findInvoiceByKey(invoiceId), "Invoice %s not found", invoiceId);
        checkCanEditInvoice(invoice, AppModule.currentUser());

        invoices.get().update(new ObjectId(invoiceId)).with("{$pull: {attachments: {_id: #}}}", new ObjectId(attachmentId));

        if (null != eventBus) {
            eventBus.post(new InvoiceUpdatedEvent(invoice));
            eventBus.post(rxinvoice.domain.Activity.newUpdate(invoice, AppModule.currentUser()));
        }

        blobService.definitiveDelete(attachmentId);
    }

    private void updateAmounts(Invoice invoice) {
        BigDecimal grossAmount = BigDecimal.ZERO;
        BigDecimal netAmount = BigDecimal.ZERO;
        Map<String, VATAmount> vatAmounts = new TreeMap<>();
        for (Line line : invoice.getLines()) {
            if (line.getQuantity() != null && line.getUnitCost() != null) {
                line.setGrossAmount(line.getQuantity().multiply(line.getUnitCost()));
                grossAmount = grossAmount.add(line.getGrossAmount());
                BigDecimal vatAmountLine = BigDecimal.ZERO;
                if (null != line.getVat()
                        && null != line.getVat().getVat()
                        && null != line.getVat().getAmount()) {
                    vatAmountLine = line.getGrossAmount()
                            .multiply(line.getVat().getAmount()
                                    .divide(new BigDecimal(100))).setScale(2, RoundingMode.HALF_UP);
                    String vatName = line.getVat().getVat();
                    VATAmount vatAmount = vatAmounts.get(vatName);

                    if (vatAmount == null) {
                        vatAmount = new VATAmount().setVat(vatName).setAmount(BigDecimal.ZERO);
                    }
                    vatAmounts.put(vatName, vatAmount.setAmount(vatAmount.getAmount().add(vatAmountLine)));
                }
                netAmount = netAmount.add(vatAmountLine).add(line.getGrossAmount());
            }
        }

        grossAmount = grossAmount.setScale(2, RoundingMode.HALF_UP);

        invoice.setVatsAmount(new ArrayList<>(vatAmounts.values()));
        invoice.setGrossAmount(grossAmount);
        if (invoice.isWithVAT()) {
            invoice.setNetAmount(netAmount.setScale(2, RoundingMode.HALF_UP));
        } else {
            invoice.setNetAmount(grossAmount);
        }
    }

    public Invoice addAttachments(String invoiceId, List<Blob> blobs) {
        Invoice invoice = checkPresent(findInvoiceByKey(invoiceId), "Invoice %s not found", invoiceId);
        checkCanEditInvoice(invoice, AppModule.currentUser());

        invoices.get().update(new ObjectId(invoiceId)).with("{$push: {attachments: {$each: #}}}", blobs);

        if (null != eventBus) {
            eventBus.post(new InvoiceUpdatedEvent(invoice));
            eventBus.post(rxinvoice.domain.Activity.newUpdate(invoice, AppModule.currentUser()));
        }

        return invoice;
    }

    private void checkCanEditInvoice(Invoice invoice, User user) {
        if (!user.getPrincipalRoles().contains(ADMIN)) {
            if (invoice.getSeller() == null || invoice.getSeller().getKey() == null
                    || !invoice.getSeller().getKey().equals(user.getCompanyRef())) {
                logger.warn("a seller is trying to update an invoice from a different company: user: {} - invoice: {}",
                        user.getName(), invoice.getKey());
                // we don't send a forbidden to avoid guessing existing invoice keys
                throw new WebException(HttpStatus.NOT_FOUND);
            }
        }
    }

}
