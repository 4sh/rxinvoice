package rxinvoice.web.events;

import rxinvoice.domain.invoice.Invoice;

public class InvoiceUpdatedEvent {
    private Invoice invoice;

    public InvoiceUpdatedEvent(Invoice invoice) {
        this.invoice = invoice;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
}
