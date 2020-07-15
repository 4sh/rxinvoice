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
import rxinvoice.AppModule;
import rxinvoice.dao.CompanyDao;
import rxinvoice.dao.InvoiceDao;
import rxinvoice.domain.Blob;
import rxinvoice.domain.company.CommercialRelationship;
import rxinvoice.domain.invoice.*;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.User;
import rxinvoice.jongo.MoreJongos;
import rxinvoice.web.rest.BlobService;
import rxinvoice.web.events.InvoiceUpdatedEvent;
import rxinvoice.service.company.CommercialRelationshipService;
import rxinvoice.utils.SortCriteriaUtil;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Clock;
import java.util.*;
import java.util.stream.Collectors;

import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;
import static rxinvoice.domain.invoice.Status.*;
import static rxinvoice.domain.invoice.Status.WAITING_VALIDATION;
import static rxinvoice.utils.MoreJ8Preconditions.checkPresent;

@Component
public class InvoiceService {

    private static final Logger logger = LoggerFactory.getLogger(InvoiceService.class);

    private final BlobService blobService;
    private final InvoiceDao invoiceDao;
    private final CompanyDao companyDao;
    private final CommercialRelationshipService commercialRelationshipService;

    private final EventBus eventBus;
    private final Clock clock;

    public InvoiceService(Clock clock,
                          BlobService blobService,
                          InvoiceDao invoiceDao,
                          CompanyDao companyDao,
                          CommercialRelationshipService commercialRelationshipService,
                          EventBus eventBus) {
        this.clock = clock;
        this.blobService = blobService;
        this.invoiceDao = invoiceDao;
        this.companyDao = companyDao;
        this.commercialRelationshipService = commercialRelationshipService;
        this.eventBus = eventBus;
    }

    public Invoice createInvoice(Invoice invoice) {
        if (invoice.getSeller() == null) {
            User user = AppModule.currentUser();
            if (user.getPrincipalRoles().contains(SELLER)) {
                invoice.setSeller(this.companyDao.getByKey(user.getCompanyRef()));
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
        updateInvoiceVat(invoice);
        updateAmounts(invoice);
        this.invoiceDao.create(invoice);
        if (null != eventBus) {
            eventBus.post(new InvoiceUpdatedEvent(invoice));
            eventBus.post(rxinvoice.domain.Activity.newCreate(invoice, AppModule.currentUser()));
        }
        return invoice;
    }

    private void updateInvoiceVat(Invoice invoice) {
        if (invoice.isWithVAT()) {
            updateVatRates(invoice);
        } else {
            cleanVatRates(invoice);
        }
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

        updateInvoiceVat(invoice);
        updateAmounts(invoice);

        if (invoice.getStatus() != invoiceFromDB.getStatus()) {
            // as client doesn't supply status changes we set it from the database before adding the new status change.
            invoice.setStatusChanges(invoiceFromDB.getStatusChanges());
            invoice.addStatusChange(invoiceFromDB.getStatus(), user, invoice.getComment());
        }

        this.invoiceDao.update(invoice);
        if (null != eventBus) {
            eventBus.post(new InvoiceUpdatedEvent(invoice));
            eventBus.post(rxinvoice.domain.Activity.newUpdate(invoiceByKey.get(), AppModule.currentUser()));
        }

        if (invoice.getStatus() != invoiceFromDB.getStatus()) {
            handleStatusChange(invoice);
        }
        return invoice;
    }

    void cleanVatRates(Invoice invoice) {
        invoice.getVatRates().clear();
        invoice.getLines().forEach(line -> {
            line.setVatRate(null);
        });
    }

    void updateVatRates(Invoice invoice) {
        invoice.setVatRates(invoice.getLines().stream()
                .filter(line -> line.getVatRate() != null)
                .map(Line::getVatRate)
                .collect(Collectors.toList()));
    }

    private void handleStatusChange(Invoice invoice) {
        if (invoice.getBuyer() == null || invoice.getBuyer().getKey() == null) {
            return;
        }

        Optional<Company> buyerOpt = this.companyDao.findByKey(invoice.getBuyer().getKey());
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

    private void payInvoice(Invoice invoice, Company customer) {
        CommercialRelationship commercialRelationship = this.commercialRelationshipService.findByCustomer(customer.getKey())
                .setLastPaymentDate(LocalDate.now())
                .setLastPaidInvoice(new InvoiceInfo(invoice));
        this.commercialRelationshipService.updateLastInvoicePayment(commercialRelationship);
    }

    private void sendInvoice(Invoice invoice, Company customer) {
        CommercialRelationship commercialRelationship = this.commercialRelationshipService.findByCustomer(customer.getKey())
                .setLastSendDate(LocalDate.now())
                .setLastSentInvoice(new InvoiceInfo(invoice));
        this.commercialRelationshipService.updateLastInvoiceSend(commercialRelationship);
        this.invoiceDao.updateSendDate(invoice, DateTime.now().toDate());
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

        return this.invoiceDao.find(builder.get().toString(),
                Optional.of(SortCriteriaUtil.buildMongoSortQuery(invoiceSearchFilter.getSortProperties())));
    }

    public Optional<Invoice> findInvoiceByKey(String key) {
        String referencePrefix = "REF-";
        Optional<Invoice> invoice;

        if (key.startsWith(referencePrefix)) {
            invoice = this.invoiceDao.findByReference(key.substring(referencePrefix.length()));
        } else {
            invoice = this.invoiceDao.findByKey(key);
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
        return this.invoiceDao.findInvoicesByBuyer(buyerKey);
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

        return invoiceDao.find(builder.get().toString(), Optional.empty());
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
        for (Invoice invoice : this.invoiceDao.findAll()) {
            updateAmounts(invoice);
            this.invoiceDao.updateAmounts(invoice);
        }
    }

    public Status deleteInvoice(String key) {
        Optional<Invoice> invoice = findInvoiceByKey(key);
        if (invoice.isPresent()) {
            this.invoiceDao.delete(invoice.get().getKey());
            if (null != eventBus) {
                eventBus.post(new InvoiceUpdatedEvent(invoice.get()));
                eventBus.post(rxinvoice.domain.Activity.newDelete(invoice.get(), AppModule.currentUser()));
            }
            return Status.of("deleted");
        } else {
            throw new WebException(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteInvoiceAttachment(String invoiceId, String attachmentId) {
        Invoice invoice = checkPresent(findInvoiceByKey(invoiceId), "Invoice %s not found", invoiceId);
        checkCanEditInvoice(invoice, AppModule.currentUser());

        this.invoiceDao.deleteAttachment(invoice.getKey(), attachmentId);

        if (null != eventBus) {
            eventBus.post(new InvoiceUpdatedEvent(invoice));
            eventBus.post(rxinvoice.domain.Activity.newUpdate(invoice, AppModule.currentUser()));
        }

        blobService.definitiveDelete(attachmentId);
    }

    void updateAmounts(Invoice invoice) {
        BigDecimal invoiceGrossAmount = BigDecimal.ZERO;
        BigDecimal invoiceNetAmount = BigDecimal.ZERO;
        Map<BigDecimal, VATAmount> invoiceVATAmounts = new TreeMap<>();

        for (Line line : invoice.getLines()) {
            // Update gross amount
            BigDecimal lineGrossAmount = line.computeGrossAmount();
            line.setGrossAmount(lineGrossAmount);
            invoiceGrossAmount = invoiceGrossAmount.add(lineGrossAmount);

            // Update VAT amounts
            BigDecimal lineVATAmount = line.computeVatAmount();
            if (null != line.getVatRate() && null != line.getVatRate().getRate()) {
                VATAmount vatAmount = invoiceVATAmounts.get(line.getVatRate().getRate());
                if (null == vatAmount) {
                    vatAmount = new VATAmount().setLabel(line.getVatRate().getLabel());
                }
                invoiceVATAmounts.put(line.getVatRate().getRate(), vatAmount.setAmount(vatAmount.getAmount().add(lineVATAmount)));
            }

            // Update net amount
            invoiceNetAmount = invoiceNetAmount.add(lineGrossAmount).add(lineVATAmount);
        }
        invoice.setGrossAmount(invoiceGrossAmount.setScale(2, RoundingMode.HALF_UP));
        invoice.setVatsAmount(new ArrayList<>(invoiceVATAmounts.values()));
        if (invoice.isWithVAT()) {
            invoice.setNetAmount(invoiceNetAmount.setScale(2, RoundingMode.HALF_UP));
        } else {
            invoice.setNetAmount(invoiceGrossAmount);
        }
    }

    public Invoice addAttachments(String invoiceId, List<Blob> blobs) {
        Invoice invoice = checkPresent(findInvoiceByKey(invoiceId), "Invoice %s not found", invoiceId);
        checkCanEditInvoice(invoice, AppModule.currentUser());

        this.invoiceDao.updateAttachments(invoiceId, blobs);

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

    public int updateLateInvoicesStatus() {
        return this.invoiceDao.updateLateInvoices(new Date(clock.instant().toEpochMilli()));
    }
}
