package rxinvoice.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.Status;
import restx.annotations.*;
import restx.factory.Component;
import restx.security.RolesAllowed;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.enumeration.Activity;
import rxinvoice.service.invoice.InvoiceService;
import rxinvoice.utils.SortCriteriaUtil;
import rxinvoice.utils.SortProperty;

import java.util.*;
import java.util.Optional;

import static restx.common.MorePreconditions.checkEquals;
import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;
import static rxinvoice.domain.invoice.Status.*;

/**
 *
 */
@Component
@RestxResource
public class InvoiceResource {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceResource.class);

    private final InvoiceService invoiceService;

    public InvoiceResource(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @RolesAllowed({ADMIN, SELLER})
    @POST("/invoices")
    public Invoice createInvoice(Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }

    @RolesAllowed({ADMIN, SELLER})
    @PUT("/invoices/{key}")
    public Invoice updateInvoice(String key, Invoice invoice) {
        checkEquals("key", key, "invoice.key", invoice.getKey());
        return invoiceService.updateInvoice(invoice);
    }

    @GET("/invoices")
    public Iterable<Invoice> findInvoices(Optional<String> startDate,
                                          Optional<String> endDate,
                                          Optional<String> statuses,
                                          Optional<String> buyerRef,
                                          Optional<String> kind,
                                          Optional<String> query,
                                          Optional<String> reference,
                                          Optional<String> sortParam) {

        final List<SortProperty> sortProperties = SortCriteriaUtil.buildSortProperties(sortParam.orElse(null));

        return invoiceService.findInvoices(new InvoiceSearchFilter()
                .setStartDate(startDate)
                .setEndDate(endDate)
                .setStatuses(statuses)
                .setBuyerRef(buyerRef)
                .setKind(kind)
                .setQuery(query)
                .setReference(reference)
                .setSortProperties(sortProperties));
    }

    @GET("/invoices/toPrepare")
    public Iterable<Invoice> findToPrepareInvoices() {
        return invoiceService.findToPrepareInvoices();
    }

    @GET("/invoices/tasks")
    public List<Invoice> findTasks(String maxDate) {
        return invoiceService.findTasks(maxDate);
    }

    @GET("/invoices/dates/{startDate}")
    public Iterable<Invoice> findInvoicesByDates(String startDate) {
        return invoiceService.findInvoices(new InvoiceSearchFilter().setStartDate(Optional.of(startDate)));
    }

    @GET("/invoices/dates/{startDate}/{endDate}")
    public Iterable<Invoice> findInvoicesByDates(String startDate, String endDate) {
        return invoiceService.findInvoices(new InvoiceSearchFilter()
                .setStartDate(Optional.of(startDate))
                .setEndDate(Optional.of(endDate)));
    }

    @GET("/invoices/status")
    public Iterable<rxinvoice.domain.invoice.Status> findInvoiceStatus() {
        List<rxinvoice.domain.invoice.Status> statuses = Arrays.asList(values());
        statuses.sort(Comparator.comparing(rxinvoice.domain.invoice.Status::getRank));
        return statuses;
    }

    @GET("/invoices/activities")
    public Iterable<Activity> findInvoiceActivities() {
        return Arrays.asList(Activity.values());
    }

    @RolesAllowed({ADMIN})
    @GET("/invoices/update_amounts")
    public void computeMetrics() {
        invoiceService.computeMetrics();
    }

    @GET("/invoices/{key}")
    public Optional<Invoice> findInvoiceByKey(String key) {
        return invoiceService.findInvoiceByKey(key);
    }

    @RolesAllowed({ADMIN, SELLER})
    @DELETE("/invoices/{key}")
    public Status deleteInvoice(String key) {
        return invoiceService.deleteInvoice(key);
    }

    @RolesAllowed({ADMIN, SELLER})
    @DELETE("/invoices/{invoiceId}/attachments/{attachmentId}")
    public void deleteInvoice(String invoiceId, String attachmentId) {
        invoiceService.deleteInvoice(invoiceId, attachmentId);
    }
}
