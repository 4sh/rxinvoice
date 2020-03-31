package rxinvoice.domain.print;

import rxinvoice.domain.Address;
import rxinvoice.domain.company.Company;

public class CompanyPrint {
    private String key;
    private String name;
    private String fullName;
    private String detail;
    private Address address;
    private String emailAddress;
    private String legalNotice;
    private boolean showLegalNoticeForeignBuyer;

    public CompanyPrint(Company company) {
        this.key = company.getKey();
        this.name = company.getName();
        this.fullName = company.getFullName();
        this.address = company.getAddress();
        this.emailAddress = company.getEmailAddress();
        this.legalNotice = company.getCommercialRelationship() == null ? "" : company.getCommercialRelationship().getLegalNotice();
        this.detail = company.getCommercialRelationship() == null ? "" : company.getCommercialRelationship().getLegalNotice();
        this.showLegalNoticeForeignBuyer = company.getCommercialRelationship() != null && company.getCommercialRelationship().isShowLegalNoticeForeignBuyer();
    }

    @Override
    public String toString() {
        return "CompanyView{" +
                "key='" + key + '\'' +
                ", name='" + name + '\'' +
                ", fullName='" + fullName + '\'' +
                ", detail='" + detail + '\'' +
                ", address=" + address +
                ", emailAddress='" + emailAddress + '\'' +
                ", legalNotice='" + legalNotice + '\'' +
                ", showLegalNoticeForeignBuyer=" + showLegalNoticeForeignBuyer +
                '}';
    }

    public String getKey() {
        return key;
    }

    public CompanyPrint setKey(String key) {
        this.key = key;
        return this;
    }

    public String getName() {
        return name;
    }

    public CompanyPrint setName(String name) {
        this.name = name;
        return this;
    }

    public String getFullName() {
        return fullName;
    }

    public CompanyPrint setFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public String getDetail() {
        return detail;
    }

    public CompanyPrint setDetail(String detail) {
        this.detail = detail;
        return this;
    }

    public Address getAddress() {
        return address;
    }

    public CompanyPrint setAddress(Address address) {
        this.address = address;
        return this;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public CompanyPrint setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
        return this;
    }

    public String getLegalNotice() {
        return legalNotice;
    }

    public CompanyPrint setLegalNotice(String legalNotice) {
        this.legalNotice = legalNotice;
        return this;
    }

    public boolean isShowLegalNoticeForeignBuyer() {
        return showLegalNoticeForeignBuyer;
    }

    public CompanyPrint setShowLegalNoticeForeignBuyer(boolean showLegalNoticeForeignBuyer) {
        this.showLegalNoticeForeignBuyer = showLegalNoticeForeignBuyer;
        return this;
    }
}