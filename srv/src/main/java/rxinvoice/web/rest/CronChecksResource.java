package rxinvoice.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.annotations.POST;
import restx.annotations.RestxResource;
import restx.factory.Component;
import restx.security.PermitAll;
import rxinvoice.service.invoice.InvoiceService;


@Component
@RestxResource
public class CronChecksResource {

    private static final Logger logger = LoggerFactory.getLogger(CronChecksResource.class);

    private final InvoiceService invoiceService;

    public CronChecksResource(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PermitAll()
    @POST("/admin/sent-invoices")
    public Integer updateToLateStatusInvoices() {
        return invoiceService.updateLateInvoicesStatus();
    }

}
