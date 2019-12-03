package rxinvoice.domain.print;

import restx.i18n.Messages;
import rxinvoice.domain.invoice.VATAmount;
import rxinvoice.domain.invoice.VATVal;
import rxinvoice.domain.company.Business;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.invoice.Line;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class InvoicePrint {

    private static DateFormat DATE_FORMAT = SimpleDateFormat.getDateInstance(DateFormat.SHORT, Locale.FRANCE);

    private String key;

    private String date;
    private String dueDate;

    private boolean withVAT;
    private List<VATValPrint> vats = new ArrayList<>();
    private List<VATAmountPrint> vatsAmount = new ArrayList<>();
    private List<Line.LineView> lines = new ArrayList<>();

    private String reference;
    private String object;
    private String kind;
    private Business business;

    private CompanyPrint seller;
    private CompanyPrint buyer;


    private String grossAmount;
    private String netAmount;

    public InvoicePrint(Invoice invoice, Messages messages, Locale locale) {
        this.key = invoice.getKey();
        this.date = (invoice.getDate() == null) ? "" : DATE_FORMAT.format(invoice.getDate().toDate());
        this.dueDate = (invoice.getDueDate() == null) ? "" : DATE_FORMAT.format(invoice.getDueDate().toDate());
        this.withVAT = invoice.isWithVAT();
        for (VATVal vat : invoice.getVats()) {
            this.vats.add(vat.toVatView());
        }
        for (VATAmount vat : invoice.getVatsAmount()) {
            this.vatsAmount.add(vat.toVatAmountView());
        }
        for (Line line : invoice.getLines()) {
            this.lines.add(line.toLineView());
        }
        this.reference = invoice.getReference();
        this.object = invoice.getObject();
        this.kind = messages.getMessage("invoice.kind." + invoice.getKind().name(), locale);
        this.business = invoice.getBusiness();
        this.seller = invoice.getSeller().toCompanyView();
        this.buyer = invoice.getBuyer().toCompanyView();
        this.grossAmount = (invoice.getGrossAmount() == null) ? "0.00" : invoice.getGrossAmount().setScale(2).toString();
        this.netAmount = (invoice.getNetAmount() == null) ? "0.00" : invoice.getNetAmount().setScale(2).toString();
    }

    @Override
    public String toString() {
        return "InvoiceView{" +
                "dateFormat=" + DATE_FORMAT +
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

    public DateFormat getDateFormat() {
        return DATE_FORMAT;
    }

    public InvoicePrint setDateFormat(DateFormat dateFormat) {
        this.DATE_FORMAT = dateFormat;
        return this;
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

    public List<VATValPrint> getVats() {
        return vats;
    }

    public InvoicePrint setVats(List<VATValPrint> vats) {
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

    public List<Line.LineView> getLines() {
        return lines;
    }

    public InvoicePrint setLines(List<Line.LineView> lines) {
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
}