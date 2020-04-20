package rxinvoice.domain.company;

import org.joda.time.LocalDate;
import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;
import rxinvoice.domain.Auditable;
import rxinvoice.domain.invoice.InvoiceInfo;

import java.util.ArrayList;
import java.util.List;

/**
 * Customer is a relation between 2 companies. It contains customer specific data for a given seller.
 */
public class CommercialRelationship implements Auditable {

    @Id
    @ObjectId
    private String key;

    private String sellerRef;
    private String customerRef;

    private String customerManagerRef;
    private String detail;
    private String legalNotice;
    private boolean showLegalNoticeForeignBuyer;

    private LocalDate lastSendDate;
    private LocalDate lastPaymentDate;
    private InvoiceInfo lastSentInvoice;
    private InvoiceInfo lastPaidInvoice;

    private CompanyMetrics companyMetrics;

    private List<VATRate> vatRates = new ArrayList<>();
    private List<Business> businessList = new ArrayList<>();

    private String accountantReference;

    @Override
    public String toString() {
        return "CommercialRelationship{" +
                "key='" + key + '\'' +
                ", sellerRef='" + sellerRef + '\'' +
                ", customerRef='" + customerRef + '\'' +
                ", customerManagerRef='" + customerManagerRef + '\'' +
                ", detail='" + detail + '\'' +
                ", legalNotice='" + legalNotice + '\'' +
                ", showLegalNoticeForeignBuyer=" + showLegalNoticeForeignBuyer +
                ", lastSendDate=" + lastSendDate +
                ", lastPaymentDate=" + lastPaymentDate +
                ", lastSentInvoice=" + lastSentInvoice +
                ", lastPaidInvoice=" + lastPaidInvoice +
                ", companyMetrics=" + companyMetrics +
                ", vatRates=" + vatRates +
                ", businessList=" + businessList +
                ", accountantReference='" + accountantReference + '\'' +
                '}';
    }

    public List<VATRate> getVatRates() {
        return vatRates;
    }

    public List<Business> getBusinessList() {
        return businessList;
    }

    @Override
    public String getKey() {
        return key;
    }

    @Override
    public String getBusinessKey() {
        return key;
    }

    public CommercialRelationship setKey(String key) {
        this.key = key;
        return this;
    }

    public String getSellerRef() {
        return sellerRef;
    }

    public CommercialRelationship setSellerRef(String sellerRef) {
        this.sellerRef = sellerRef;
        return this;
    }

    public String getCustomerRef() {
        return customerRef;
    }

    public CommercialRelationship setCustomerRef(String customerRef) {
        this.customerRef = customerRef;
        return this;
    }

    public String getCustomerManagerRef() {
        return customerManagerRef;
    }

    public CommercialRelationship setCustomerManagerRef(String customerManagerRef) {
        this.customerManagerRef = customerManagerRef;
        return this;
    }

    public String getDetail() {
        return detail;
    }

    public CommercialRelationship setDetail(String detail) {
        this.detail = detail;
        return this;
    }

    public String getLegalNotice() {
        return legalNotice;
    }

    public CommercialRelationship setLegalNotice(String legalNotice) {
        this.legalNotice = legalNotice;
        return this;
    }

    public boolean isShowLegalNoticeForeignBuyer() {
        return showLegalNoticeForeignBuyer;
    }

    public CommercialRelationship setShowLegalNoticeForeignBuyer(boolean showLegalNoticeForeignBuyer) {
        this.showLegalNoticeForeignBuyer = showLegalNoticeForeignBuyer;
        return this;
    }

    public LocalDate getLastSendDate() {
        return lastSendDate;
    }

    public CommercialRelationship setLastSendDate(LocalDate lastSendDate) {
        this.lastSendDate = lastSendDate;
        return this;
    }

    public LocalDate getLastPaymentDate() {
        return lastPaymentDate;
    }

    public CommercialRelationship setLastPaymentDate(LocalDate lastPaymentDate) {
        this.lastPaymentDate = lastPaymentDate;
        return this;
    }

    public InvoiceInfo getLastSentInvoice() {
        return lastSentInvoice;
    }

    public CommercialRelationship setLastSentInvoice(InvoiceInfo lastSentInvoice) {
        this.lastSentInvoice = lastSentInvoice;
        return this;
    }

    public InvoiceInfo getLastPaidInvoice() {
        return lastPaidInvoice;
    }

    public CommercialRelationship setLastPaidInvoice(InvoiceInfo lastPaidInvoice) {
        this.lastPaidInvoice = lastPaidInvoice;
        return this;
    }

    public CompanyMetrics getCompanyMetrics() {
        return companyMetrics;
    }

    public CommercialRelationship setCompanyMetrics(CompanyMetrics companyMetrics) {
        this.companyMetrics = companyMetrics;
        return this;
    }

    public CommercialRelationship setVatRates(List<VATRate> vatRates) {
        this.vatRates = vatRates;
        return this;
    }

    public CommercialRelationship setBusinessList(List<Business> businessList) {
        this.businessList = businessList;
        return this;
    }

    public String getAccountantReference() {
        return accountantReference;
    }

    public CommercialRelationship setAccountantReference(String accountantReference) {
        this.accountantReference = accountantReference;
        return this;
    }
}
