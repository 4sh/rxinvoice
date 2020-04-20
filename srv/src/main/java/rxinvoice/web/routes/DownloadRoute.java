package rxinvoice.web.routes;

import com.google.common.base.Optional;
import com.google.common.io.ByteStreams;
import com.google.common.net.HttpHeaders;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.*;
import restx.factory.Component;
import restx.http.HttpStatus;
import rxinvoice.domain.Blob;
import rxinvoice.web.rest.BlobService;

import java.io.IOException;
import java.io.InputStream;

/**
 */
@Component
public class DownloadRoute extends StdRoute {

    private static final Logger logger = LoggerFactory.getLogger(DownloadRoute.class);

    private final BlobService blobService;

    public DownloadRoute(BlobService blobService) {
        super("download", new StdRestxRequestMatcher("GET", "/download/{id}"));
        this.blobService = blobService;
    }

    @Override
    public void handle(RestxRequestMatch match, RestxRequest req, RestxResponse resp, RestxContext ctx) throws IOException {
        final String fileId = match.getPathParams().get("id");

        if (!ObjectId.isValid(fileId)) {
            resp.setStatus(HttpStatus.BAD_REQUEST);
            return;
        }

        Optional<Blob> blob = blobService.find(fileId);

        if (!blob.isPresent()) {
            resp.setStatus(HttpStatus.NOT_FOUND);
            return;
        }

        resp.setStatus(HttpStatus.OK);
        resp.setHeader(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + blob.get().getFileName() + "\"");
        resp.setContentType(Optional.fromNullable(blob.get().getMimeType()).or("application/octet-stream"));

        try (InputStream inputStream = blobService.openStream(blob.get().getId())) {
            ByteStreams.copy(inputStream, resp.getOutputStream());
        } catch (IOException e) {
            if (e.getClass().getCanonicalName().equals("org.apache.catalina.connector.ClientAbortException")) {
                logger.debug("Client closed connection", e);
            } else {
                throw e;
            }
        }
    }
}
