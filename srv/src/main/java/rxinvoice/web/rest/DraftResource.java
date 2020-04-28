package rxinvoice.web.rest;

import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.service.invoice.DraftService;

@Component
@RestxResource
public class DraftResource {

    private final DraftService draftService;

    public DraftResource(DraftService draftService) {
        this.draftService = draftService;
    }

    @GET("/drafts")
    public Iterable<Invoice> findDrafts() {
        return this.draftService.findAll();
    }
}
