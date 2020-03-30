package rxinvoice.domain.company;

import com.fasterxml.jackson.annotation.JsonView;
import org.joda.time.DateTime;
import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;
import restx.jackson.Views;
import rxinvoice.domain.*;
import rxinvoice.domain.print.CompanyPrint;
import rxinvoice.domain.enumeration.KindCompany;
import rxinvoice.domain.invoice.InvoiceInfo;

import java.util.*;

/**
 *
 */
public class Company implements Auditable {
    @Id
    @ObjectId
    private String key;
    private String name;
    private String siren;
    private String fullName;
    private KindCompany kind;
    private Address address;
    private String emailAddress;

    private String detail;
    private String legalNotice;
    private Boolean showLegalNoticeForeignBuyer;

    private Metrics metrics;
    private FiscalYear fiscalYear = FiscalYear.DEFAULT;

    private DateTime creationDate;
    private DateTime lastSendDate;
    private DateTime lastPaymentDate;

    private InvoiceInfo lastSentInvoice;
    private InvoiceInfo lastPaidInvoice;

    @JsonView(Views.Transient.class)
    private Map<String, Metrics> fiscalYearMetricsMap = new HashMap<>();
    public CompanyPrint toCompanyView() {
        return new CompanyPrint(this);
    }

    private final Map<String, Customer> customers = new HashMap<>();

    @Override
    public String getKey() {
        return key;
    }
    @Override
    public String getBusinessKey() {
        return siren;
    }

    @Override
    public String toString() {
        return "Company{" +
                "key='" + key + '\'' +
                ", name='" + name + '\'' +
                ", siren='" + siren + '\'' +
                ", fullName='" + fullName + '\'' +
                ", detail='" + detail + '\'' +
                ", kind=" + kind +
                ", address=" + address +
                ", emailAddress='" + emailAddress + '\'' +
                ", legalNotice='" + legalNotice + '\'' +
                ", showLegalNoticeForeignBuyer=" + showLegalNoticeForeignBuyer +
                ", metrics=" + metrics +
                ", fiscalYear=" + fiscalYear +
                ", creationDate=" + creationDate +
                ", lastSendDate=" + lastSendDate +
                ", lastPaymentDate=" + lastPaymentDate +
                ", lastSentInvoice=" + lastSentInvoice +
                ", lastPaidInvoice=" + lastPaidInvoice +
                ", fiscalYearMetricsMap=" + fiscalYearMetricsMap +
                ", customers=" + customers +
                '}';
    }


    public Company setKey(String key) {
        this.key = key;
        return this;
    }

    public String getName() {
        return name;
    }

    public Company setName(String name) {
        this.name = name;
        return this;
    }

    public String getSiren() {
        return siren;
    }

    public Company setSiren(String siren) {
        this.siren = siren;
        return this;
    }

    public String getFullName() {
        return fullName;
    }

    public Company setFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public String getDetail() {
        return detail;
    }

    public Company setDetail(String detail) {
        this.detail = detail;
        return this;
    }

    public KindCompany getKind() {
        return kind;
    }

    public Company setKind(KindCompany kind) {
        this.kind = kind;
        return this;
    }

    public Address getAddress() {
        return address;
    }

    public Company setAddress(Address address) {
        this.address = address;
        return this;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public Company setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
        return this;
    }

    public String getLegalNotice() {
        return legalNotice;
    }

    public Company setLegalNotice(String legalNotice) {
        this.legalNotice = legalNotice;
        return this;
    }

    public Boolean getShowLegalNoticeForeignBuyer() {
        return showLegalNoticeForeignBuyer;
    }

    public Company setShowLegalNoticeForeignBuyer(Boolean showLegalNoticeForeignBuyer) {
        this.showLegalNoticeForeignBuyer = showLegalNoticeForeignBuyer;
        return this;
    }

    public Metrics getMetrics() {
        return metrics;
    }

    public Company setMetrics(Metrics metrics) {
        this.metrics = metrics;
        return this;
    }

    public FiscalYear getFiscalYear() {
        return fiscalYear;
    }

    public Company setFiscalYear(FiscalYear fiscalYear) {
        this.fiscalYear = fiscalYear;
        return this;
    }

    public DateTime getCreationDate() {
        return creationDate;
    }

    public Company setCreationDate(DateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public DateTime getLastSendDate() {
        return lastSendDate;
    }

    public Company setLastSendDate(DateTime lastSendDate) {
        this.lastSendDate = lastSendDate;
        return this;
    }

    public DateTime getLastPaymentDate() {
        return lastPaymentDate;
    }

    public Company setLastPaymentDate(DateTime lastPaymentDate) {
        this.lastPaymentDate = lastPaymentDate;
        return this;
    }

    public InvoiceInfo getLastSentInvoice() {
        return lastSentInvoice;
    }

    public Company setLastSentInvoice(InvoiceInfo lastSentInvoice) {
        this.lastSentInvoice = lastSentInvoice;
        return this;
    }

    public InvoiceInfo getLastPaidInvoice() {
        return lastPaidInvoice;
    }

    public Company setLastPaidInvoice(InvoiceInfo lastPaidInvoice) {
        this.lastPaidInvoice = lastPaidInvoice;
        return this;
    }

    public Map<String, Metrics> getFiscalYearMetricsMap() {
        return fiscalYearMetricsMap;
    }

    public Company setFiscalYearMetricsMap(Map<String, Metrics> fiscalYearMetricsMap) {
        this.fiscalYearMetricsMap = fiscalYearMetricsMap;
        return this;
    }

    public Map<String, Customer> getCustomers() {
        return customers;
    }
}
