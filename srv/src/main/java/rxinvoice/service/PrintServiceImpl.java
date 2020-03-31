package rxinvoice.service;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.openhtmltopdf.util.XRLog;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.i18n.Messages;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.service.company.CommercialRelationshipService;
import rxinvoice.service.invoice.InvoiceService;

import javax.inject.Named;
import java.io.*;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import static rxinvoice.utils.MoreJ8Preconditions.checkPresent;

@Component
public class PrintServiceImpl implements PrintService {

    private static final Logger logger = LoggerFactory.getLogger(PrintServiceImpl.class);

    private final InvoiceService invoiceService;
    private final Messages messages;
    private final CommercialRelationshipService commercialRelationshipService;

    public PrintServiceImpl(InvoiceService invoiceService,
                            @Named("Messages") Messages messages,
                            CommercialRelationshipService commercialRelationshipService) {
        this.invoiceService = invoiceService;
        this.messages = messages;
        this.commercialRelationshipService = commercialRelationshipService;
    }

    private void createPdfFromHtml(String html, OutputStream outputStream) {
        XRLog.setLoggingEnabled(false);
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.withHtmlContent(html, "/");
        builder.toStream(outputStream);
        try {
            builder.run();
        } catch (Exception e) {
            logger.error("Pdf generation failed {}", e.getMessage());
        }
    }

    private String executeTemplate(String templateName, Map<String, Object> params) {
        DefaultMustacheFactory mf = new DefaultMustacheFactory();
        Mustache m = mf.compile("templates/" + templateName);
        StringWriter writer = new StringWriter();
        try {
            m.execute(writer, params).flush();
        } catch (IOException e) {
            logger.error("Template execution failed for template {} : {}", templateName, e.getMessage());
        }
        return writer.toString();
    }

    public void exportUriToPdf(String invoiceId, OutputStream outputStream) {

        Invoice invoice = checkPresent(invoiceService.findInvoiceByKey(invoiceId),
                String.format("Invoice not found for id %s", invoiceId));

        invoice.getBuyer().setCommercialRelationship(commercialRelationshipService.findByCustomer(invoice.getBuyer().getKey()));
        Map<String, Object> params = new HashMap<>();
        params.put("invoice", invoice.toInvoiceView(messages, Locale.FRANCE));

        String html = executeTemplate("invoice.mustache", params);
        try {
            createPdfFromHtml(html, outputStream);
        } catch (Exception e) {
            logger.error("Pdf generation failed {}", e.getMessage());
        }
    }
}
