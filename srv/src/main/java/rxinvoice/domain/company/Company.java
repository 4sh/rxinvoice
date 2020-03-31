package rxinvoice.domain.company;

import com.fasterxml.jackson.annotation.JsonView;
import org.joda.time.DateTime;
import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;
import restx.jackson.Views;
import rxinvoice.domain.*;
import rxinvoice.domain.print.CompanyPrint;
import rxinvoice.domain.enumeration.KindCompany;

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
    private FiscalYear fiscalYear = FiscalYear.DEFAULT;
    private DateTime creationDate;

    @JsonView(Views.Transient.class)
    private CommercialRelationship commercialRelationship;

    public CompanyPrint toCompanyView() {
        return new CompanyPrint(this);
    }

    @Override
    public String toString() {
        return "Company{" +
                "key='" + key + '\'' +
                ", name='" + name + '\'' +
                ", siren='" + siren + '\'' +
                ", fullName='" + fullName + '\'' +
                ", kind=" + kind +
                ", address=" + address +
                ", emailAddress='" + emailAddress + '\'' +
                ", fiscalYear=" + fiscalYear +
                ", creationDate=" + creationDate +
                '}';
    }

    @Override
    public String getKey() {
        return key;
    }
    @Override
    public String getBusinessKey() {
        return siren;
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

    public CommercialRelationship getCommercialRelationship() {
        return commercialRelationship;
    }

    public Company setCommercialRelationship(CommercialRelationship commercialRelationship) {
        this.commercialRelationship = commercialRelationship;
        return this;
    }
}
