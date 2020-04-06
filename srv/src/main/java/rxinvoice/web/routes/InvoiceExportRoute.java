package rxinvoice.web.routes;

import com.google.common.net.HttpHeaders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.*;
import restx.factory.Component;
import restx.http.HttpStatus;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.service.invoice.InvoiceSearchFilter;
import rxinvoice.service.invoice.InvoiceExportService;
import rxinvoice.service.invoice.InvoiceService;
import rxinvoice.utils.OptionalUtils;

import java.io.IOException;
import java.io.OutputStream;

/**
 *
 */
@Component
public class InvoiceExportRoute extends StdRoute {

    private static final Logger logger = LoggerFactory.getLogger(InvoiceExportRoute.class);


    private final InvoiceService invoiceService;
    private final InvoiceExportService invoiceExportService;

    public InvoiceExportRoute(InvoiceService invoiceService, InvoiceExportService invoiceExportService) {
        super("exports", new StdRestxRequestMatcher("GET", "/exports/invoices"));
        this.invoiceService = invoiceService;
        this.invoiceExportService = invoiceExportService;
    }

    @Override
    public void handle(RestxRequestMatch match, final RestxRequest req, RestxResponse resp, RestxContext ctx) throws IOException {
        resp.setStatus(HttpStatus.OK);
        resp.setHeader(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"Report.xlsx\"");
        resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        Iterable<Invoice> invoices = invoiceService.findInvoices(new InvoiceSearchFilter()
                .setStartDate(OptionalUtils.convertToJ8Optional(req.getQueryParam("startDate")))
                .setEndDate(OptionalUtils.convertToJ8Optional(req.getQueryParam("endDate")))
                .setStatuses(OptionalUtils.convertToJ8Optional(req.getQueryParam("statuses")))
                .setBuyerRef(OptionalUtils.convertToJ8Optional(req.getQueryParam("buyerRef")))
                .setKind(OptionalUtils.convertToJ8Optional(req.getQueryParam("kind")))
                .setQuery(OptionalUtils.convertToJ8Optional(req.getQueryParam("query")))
                .setReference(OptionalUtils.convertToJ8Optional(req.getQueryParam("reference"))));

        try (OutputStream outputStream = resp.getOutputStream()) {
            invoiceExportService.exportInvoices(invoices, outputStream);
            outputStream.flush();
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }

    }
}
