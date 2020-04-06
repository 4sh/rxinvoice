package rxinvoice.web.routes;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.*;
import restx.factory.Component;
import restx.http.HttpStatus;
import rxinvoice.AppModule;
import rxinvoice.domain.Blob;
import rxinvoice.web.rest.BlobService;
import rxinvoice.web.common.PartsReader;
import rxinvoice.service.invoice.InvoiceService;

import javax.inject.Named;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 */
@Component
public class UploadRoute extends StdRoute {
    private static final Logger logger = LoggerFactory.getLogger(UploadRoute.class);

    private final BlobService blobService;
    private final ObjectMapper objectMapper;
    private final InvoiceService invoiceService;

    public UploadRoute(BlobService blobService,
                       @Named("FrontObjectMapper") ObjectMapper objectMapper,
                       InvoiceService invoiceService) {
        super("upload", new StdRestxRequestMatcher("POST", "/invoices/{invoiceId}/attachments"));
        this.blobService = blobService;
        this.objectMapper = objectMapper;
        this.invoiceService = invoiceService;
    }

    @Override
    public void handle(RestxRequestMatch match, final RestxRequest req, RestxResponse resp, RestxContext ctx) throws IOException {
        final List<Blob> blobs = new ArrayList<>();
        String invoiceId = match.getPathParam("invoiceId");

        if (AppModule.currentUser() == null) {
            throw new WebException("User not connected");
        }

        new PartsReader(req).readParts(new PartsReader.PartListener() {
            @Override
            public void onPart(PartsReader.Part part) throws IOException {
                String fileName = null;
                String comments = null;
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                String contentType = null;

                if (part instanceof PartsReader.FilePart) {
                    PartsReader.FilePart filePart = (PartsReader.FilePart) part;
                    filePart.readStreamTo(outputStream);
                    fileName = filePart.getFilename();
                    contentType = filePart.getContentType();
                } else if (part instanceof PartsReader.TextPart) {
                    String key = ((PartsReader.TextPart) part).getName();
                    String value = ((PartsReader.TextPart) part).getValue();

                    switch (key) {
                        case "comments":
                            comments = value;
                            break;
                        default:
                            outputStream.write(value.getBytes());
                            fileName = part.getName();
                            contentType = "text/plain";
                    }
                } else {
                    throw new IllegalStateException("Part type is not supported.");
                }

                if (fileName != null) {
                    blobs.add(blobService.create(
                            new Blob()
                                    .setFileName(fileName)
                                    .setMimeType(contentType)
                                    .setComments(comments),
                            new ByteArrayInputStream(outputStream.toByteArray())));
                }
            }
        });

        resp.setStatus(HttpStatus.OK);
        resp.setContentType("application/json");

        invoiceService.addAttachments(invoiceId, blobs);

        objectMapper.writeValue(resp.getOutputStream(), blobs);
    }
}
