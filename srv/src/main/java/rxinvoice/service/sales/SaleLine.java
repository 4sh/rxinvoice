package rxinvoice.service.sales;

import org.joda.time.DateTime;
import rxinvoice.domain.invoice.Invoice;

import java.math.BigDecimal;

class SaleLine {

    private DateTime invoiceDate;
    private String reference;
    private String account;
    private String label;
    private BigDecimal debit;
    private BigDecimal credit;

    private SaleLine() {
    }

    public static SaleLine build(Invoice invoice) {
        return new SaleLine()
                .setInvoiceDate(invoice.getDate().toDateTime())
                .setReference(invoice.getReference())
                .setLabel(invoice.getObject().replaceAll("\n", " "));
    }

    public DateTime getInvoiceDate() {
        return invoiceDate;
    }

    public SaleLine setInvoiceDate(DateTime invoiceDate) {
        this.invoiceDate = invoiceDate;
        return this;
    }

    public String getReference() {
        return reference;
    }

    public SaleLine setReference(String reference) {
        this.reference = reference;
        return this;
    }

    public String getAccount() {
        return account;
    }

    public SaleLine setAccount(String account) {
        this.account = account;
        return this;
    }

    public String getLabel() {
        return label;
    }

    public SaleLine setLabel(String label) {
        this.label = label;
        return this;
    }

    public BigDecimal getDebit() {
        return debit;
    }

    public SaleLine setDebit(BigDecimal debit) {
        this.debit = debit;
        return this;
    }

    public BigDecimal getCredit() {
        return credit;
    }

    public SaleLine setCredit(BigDecimal credit) {
        this.credit = credit;
        return this;
    }
}