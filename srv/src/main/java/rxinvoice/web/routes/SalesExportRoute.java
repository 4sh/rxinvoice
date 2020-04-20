package rxinvoice.web.routes;

import com.google.common.net.HttpHeaders;
import org.joda.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.*;
import restx.factory.Component;
import restx.http.HttpStatus;
import rxinvoice.domain.enumeration.ServiceKind;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.invoice.Status;
import rxinvoice.service.invoice.InvoiceSearchFilter;
import rxinvoice.service.invoice.InvoiceService;
import rxinvoice.service.sales.SalesExportService;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
public class SalesExportRoute extends StdRoute {

    private static final Logger logger = LoggerFactory.getLogger(SalesExportRoute.class);

    private final InvoiceService invoiceService;
    private final SalesExportService salesExportService;

    public SalesExportRoute(InvoiceService invoiceService, SalesExportService salesExportService) {
        super("exports", new StdRestxRequestMatcher("GET", "/exports/sales"));
        this.invoiceService = invoiceService;
        this.salesExportService = salesExportService;
    }

    @Override
    public void handle(RestxRequestMatch match, final RestxRequest req, RestxResponse resp, RestxContext ctx) throws IOException {
        resp.setStatus(HttpStatus.OK);
        resp.setHeader(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"Sales.xlsx\"");
        resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        String year = req.getQueryParam("year").or(LocalDate.now().getYear() + "");
        String month = req.getQueryParam("month").or(LocalDate.now().getMonthOfYear() + "");

        LocalDate monthStart = new LocalDate(Integer.parseInt(year), Integer.parseInt(month), 1);
        LocalDate monthEnd = monthStart.plusMonths(1).minusDays(1);

        Iterable<Invoice> invoices = invoiceService.findInvoices(new InvoiceSearchFilter()
                .setStartDate(Optional.of(monthStart.toString()))
                .setEndDate(Optional.of(monthEnd.toString())));

        invoices = StreamSupport.stream(invoices.spliterator(), false)
                .filter(invoice -> invoice.getReference() != null)
                .collect(Collectors.toList());
        try (OutputStream outputStream = resp.getOutputStream()) {
            salesExportService.exportSales(invoices, outputStream);
            outputStream.flush();
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }
}
