package rxinvoice.domain.print;

import restx.i18n.Messages;
import rxinvoice.domain.company.VATRate;
import rxinvoice.domain.invoice.VATAmount;
import rxinvoice.domain.company.Business;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.invoice.Line;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class InvoicePrint {

    private String key;

    private String date;
    private String dueDate;

    private boolean withVAT;
    private List<VATRatePrint> vats = new ArrayList<>();
    private List<VATAmountPrint> vatsAmount = new ArrayList<>();
    private List<InvoiceLinePrint> lines = new ArrayList<>();

    private String reference;
    private String customerInvoiceRef;
    private String object;
    private String kind;
    private Business business;

    private CompanyPrint seller;
    private CompanyPrint buyer;


    private String grossAmount;
    private String netAmount;

    public InvoicePrint(Invoice invoice, Messages messages, Locale locale) {
        this.key = invoice.getKey();
        this.date = (invoice.getDate() == null) ? "" : PrintUtils.DATE_FORMAT.format(invoice.getDate().toDate());
        this.dueDate = (invoice.getDueDate() == null) ? "" : PrintUtils.DATE_FORMAT.format(invoice.getDueDate().toDate());
        this.withVAT = invoice.isWithVAT();
        for (VATRate vat : invoice.getVatRates()) {
            this.vats.add(vat.toVatView());
        }
        for (VATAmount vat : invoice.getVatsAmount()) {
            this.vatsAmount.add(vat.toVatAmountView());
        }
        for (Line line : invoice.getLines()) {
            this.lines.add(line.toInvoiceLinePrint());
        }
        this.reference = invoice.getReference();
        this.customerInvoiceRef = invoice.getCustomerInvoiceRef();
        this.object = invoice.getObject();
        this.kind = messages.getMessage("invoice.kind." + invoice.getKind().name(), locale);
        this.business = invoice.getBusiness();
        this.seller = invoice.getSeller().toCompanyView();
        this.buyer = invoice.getBuyer().toCompanyView();
        this.grossAmount = PrintUtils.NUMBER_FORMAT.format((invoice.getGrossAmount() == null)
                ? BigDecimal.ZERO
                : invoice.getGrossAmount().setScale(2, RoundingMode.HALF_EVEN));
        this.netAmount = PrintUtils.NUMBER_FORMAT.format((invoice.getNetAmount() == null)
                ? BigDecimal.ZERO
                : invoice.getNetAmount().setScale(2, RoundingMode.HALF_EVEN));
    }

    @Override
    public String toString() {
        return "InvoiceView{" +
                ", key='" + key + '\'' +
                ", date='" + date + '\'' +
                ", dueDate='" + dueDate + '\'' +
                ", withVAT=" + withVAT +
                ", vats=" + vats +
                ", vatsAmount=" + vatsAmount +
                ", lines=" + lines +
                ", reference='" + reference + '\'' +
                ", object='" + object + '\'' +
                ", kind=" + kind +
                ", business=" + business +
                ", seller=" + seller +
                ", buyer=" + buyer +
                ", grossAmount=" + grossAmount +
                ", netAmount=" + netAmount +
                '}';
    }

    public String getKey() {
        return key;
    }

    public InvoicePrint setKey(String key) {
        this.key = key;
        return this;
    }

    public String getDate() {
        return date;
    }

    public InvoicePrint setDate(String date) {
        this.date = date;
        return this;
    }

    public String getDueDate() {
        return dueDate;
    }

    public InvoicePrint setDueDate(String dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public boolean isWithVAT() {
        return withVAT;
    }

    public InvoicePrint setWithVAT(boolean withVAT) {
        this.withVAT = withVAT;
        return this;
    }

    public List<VATRatePrint> getVats() {
        return vats;
    }

    public InvoicePrint setVats(List<VATRatePrint> vats) {
        this.vats = vats;
        return this;
    }

    public List<VATAmountPrint> getVatsAmount() {
        return vatsAmount;
    }

    public InvoicePrint setVatsAmount(List<VATAmountPrint> vatsAmount) {
        this.vatsAmount = vatsAmount;
        return this;
    }

    public List<InvoiceLinePrint> getLines() {
        return lines;
    }

    public InvoicePrint setLines(List<InvoiceLinePrint> lines) {
        this.lines = lines;
        return this;
    }

    public String getReference() {
        return reference;
    }

    public InvoicePrint setReference(String reference) {
        this.reference = reference;
        return this;
    }

    public String getObject() {
        return object;
    }

    public InvoicePrint setObject(String object) {
        this.object = object;
        return this;
    }

    public String getKind() {
        return kind;
    }

    public InvoicePrint setKind(String kind) {
        this.kind = kind;
        return this;
    }

    public Business getBusiness() {
        return business;
    }

    public InvoicePrint setBusiness(Business business) {
        this.business = business;
        return this;
    }

    public CompanyPrint getSeller() {
        return seller;
    }

    public InvoicePrint setSeller(CompanyPrint seller) {
        this.seller = seller;
        return this;
    }

    public CompanyPrint getBuyer() {
        return buyer;
    }

    public InvoicePrint setBuyer(CompanyPrint buyer) {
        this.buyer = buyer;
        return this;
    }

    public String getGrossAmount() {
        return grossAmount;
    }

    public InvoicePrint setGrossAmount(String grossAmount) {
        this.grossAmount = grossAmount;
        return this;
    }

    public String getNetAmount() {
        return netAmount;
    }

    public InvoicePrint setNetAmount(String netAmount) {
        this.netAmount = netAmount;
        return this;
    }

    public String getCustomerInvoiceRef() {
        return customerInvoiceRef;
    }

    public InvoicePrint setCustomerInvoiceRef(String customerInvoiceRef) {
        this.customerInvoiceRef = customerInvoiceRef;
        return this;
    }
}