package rxinvoice.web.common;

import com.google.common.base.Charsets;
import com.google.common.base.Optional;
import com.google.common.base.Splitter;
import com.google.common.net.HttpHeaders;
import org.apache.commons.fileupload.MultipartStream;
import restx.RestxRequest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

/**
 * Date: 19/02/2015
 * Time: 11:25
 */
public class PartsReader {
    private final RestxRequest req;

    public PartsReader(RestxRequest req) {
        this.req = req;
    }

    /**
     * Read request parts and notifies the given listener of each part.
     *
     * A listener mechanism is used because data is read from a stream, so you can't get all parts without actually
     * reading them.
     *
     * @param listener the listener that will be notified of each part.
     * @throws IOException on io error
     */
    public void readParts(PartListener listener) throws IOException {
        String contentType = req.getContentType();
        int boundaryIndex = contentType.indexOf("boundary=");
        byte[] boundary = (contentType.substring(boundaryIndex + 9)).getBytes();

        MultipartStream multipartStream = new MultipartStream(req.getContentStream(), boundary);
        boolean nextPart = multipartStream.skipPreamble();
        while (nextPart) {
            Map<String, String> headers = parseHeaders(multipartStream.readHeaders());
            String contentDisposition = headers.get("content-disposition");
            if (contentDisposition == null) {
                throw new IOException("unsupported multi part format: no content-disposition on one of the parts");
            }
            Map<String, String> parameters = new LinkedHashMap<>();
            if (contentDisposition.startsWith("form-data;")) {
                Iterable<String> split = Splitter.on(';').trimResults().split(contentDisposition.substring("form-data;".length()));
                for (String s : split) {
                    int i = s.indexOf('=');
                    String name = s.substring(0, i);

                    // Note: value is surrounded by " that we get rid of
                    String value = s.substring(i + 2, s.length() - 1);
                    parameters.put(name, value);
                }
            } else {
                throw new IOException("unsupported multi part format: a content-disposition does not start with form-data");
            }

            String partName = parameters.get("name");
            if (partName == null) {
                throw new IOException("unsupported multi part format: a part has no 'name'");
            }

            String cType = headers.get("content-type");
            if (cType != null) {
                listener.onPart(new FilePart(partName, multipartStream, parameters.get("filename"), cType));
            } else {
                ByteArrayOutputStream data = new ByteArrayOutputStream();
                multipartStream.readBodyData(data);

                /**
                 * The component used to manage upload client side (angular-file-upload) send TextPart and FilePart when used with
                 * IE not supporting html5. It causes issue, because the file is unreadable after upload.
                 * So this (ugly) hack allows to manage upload from old-IE : it ignore TextPart.
                 */
                Optional<String> userAgent = req.getHeader(HttpHeaders.USER_AGENT);
                if (!userAgent.isPresent() || (!userAgent.get().equals("Shockwave Flash") && !userAgent.get().contains("windows"))) {
                    // we use UTF-8 charset, but we should better get it from the request...
                    listener.onPart(new TextPart(partName, data.toString(Charsets.UTF_8.name())));
                }
            }

            nextPart = multipartStream.readBoundary();
        }

    }


    private Map<String, String> parseHeaders(String headerPart) {
        final int len = headerPart.length();
        Map<String, String> headers = new LinkedHashMap<>();
        int start = 0;
        for (; ; ) {
            int end = parseEndOfLine(headerPart, start);
            if (start == end) {
                break;
            }
            StringBuilder header = new StringBuilder(headerPart.substring(start, end));
            start = end + 2;
            while (start < len) {
                int nonWs = start;
                while (nonWs < len) {
                    char c = headerPart.charAt(nonWs);
                    if (c != ' ' && c != '\t') {
                        break;
                    }
                    ++nonWs;
                }
                if (nonWs == start) {
                    break;
                }
                // Continuation line found
                end = parseEndOfLine(headerPart, nonWs);
                header.append(" ").append(headerPart.substring(nonWs, end));
                start = end + 2;
            }
            parseHeaderLine(headers, header.toString());
        }
        return headers;
    }

    /**
     * Skips bytes until the end of the current line.
     *
     * @param headerPart The headers, which are being parsed.
     * @param end        Index of the last byte, which has yet been
     *                   processed.
     * @return Index of the \r\n sequence, which indicates
     *         end of line.
     */
    private int parseEndOfLine(String headerPart, int end) {
        int index = end;
        for (; ; ) {
            int offset = headerPart.indexOf('\r', index);
            if (offset == -1 || offset + 1 >= headerPart.length()) {
                throw new IllegalStateException(
                        "Expected headers to be terminated by an empty line.");
            }
            if (headerPart.charAt(offset + 1) == '\n') {
                return offset;
            }
            index = offset + 1;
        }
    }

    /**
     * Reads the next header line.
     *
     * @param headers String with all headers.
     * @param header  Map where to store the current header.
     */
    private void parseHeaderLine(Map<String, String> headers, String header) {
        final int colonOffset = header.indexOf(':');
        if (colonOffset == -1) {
            // This header line is malformed, skip it.
            return;
        }
        String headerName = header.substring(0, colonOffset).trim();
        String headerValue =
                header.substring(header.indexOf(':') + 1).trim();
        headers.put(headerName.toLowerCase(Locale.ENGLISH), headerValue);
    }


    public static interface PartListener {
        public void onPart(Part part) throws IOException;
    }

    public static class FilePart extends Part {
        private final MultipartStream multipartStream;
        private final String filename;
        private final String contentType;

        public FilePart(String name, MultipartStream multipartStream, String filename, String contentType) {
            super(name);
            this.multipartStream = multipartStream;
            this.filename = filename;
            this.contentType = contentType;
        }

        public String getFilename() {
            return filename;
        }

        public String getContentType() {
            return contentType;
        }

        public void readStreamTo(OutputStream outputStream) throws IOException {
            multipartStream.readBodyData(outputStream);
        }
    }

    public static class TextPart extends Part {
        private final String value;

        public TextPart(String name, String value) {
            super(name);
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public static abstract class Part {
        private final String name;

        protected Part(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }
}
