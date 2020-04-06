package rxinvoice.web.routes;

import com.google.common.base.Optional;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.*;
import restx.factory.Component;
import restx.http.HttpStatus;
import rxinvoice.service.PrintService;

import java.io.*;

/**
 * User: mmuller
 * Date: 31/01/14
 * Time: 18:43
 */
@Component
public class PrintRoute extends StdRoute {
    private static final Logger LOGGER = LoggerFactory.getLogger(PrintRoute.class);

    private PrintService printService;

    public PrintRoute(PrintService printService) {

        super("print", new StdRestxRequestMatcher("GET", "/print"));
        this.printService = printService;
    }

    @Override
    public void handle(RestxRequestMatch match, RestxRequest req, RestxResponse resp, RestxContext ctx) throws IOException {
        Optional<String> invoiceId = req.getQueryParam("invoiceId");
        Optional<String> filename = req.getQueryParam("filename");

        OutputStream outputStream = resp.getOutputStream();

        if (invoiceId.isPresent()) {
            if (filename.isPresent()) {
                resp.setHeader("Content-Disposition", "attachment; filename=\"" + StringUtils.stripAccents(filename.get()) + "\"");
            }
            resp.setStatus(HttpStatus.OK);
            resp.setContentType("application/pdf");
            printService.exportUriToPdf(invoiceId.get(), outputStream);
        } else {
            resp.setStatus(HttpStatus.NOT_ACCEPTABLE);
            resp.getWriter().write("Bad arguments, please give pageUri parameters without the starting #" + req.getRestxUri());
        }
    }
}