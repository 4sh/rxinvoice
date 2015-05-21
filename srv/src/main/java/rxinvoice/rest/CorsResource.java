package rxinvoice.rest;

import com.google.common.base.Optional;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import restx.annotations.GET;
import restx.annotations.POST;
import restx.annotations.RestxResource;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import restx.security.RolesAllowed;
import rxinvoice.domain.Business;
import rxinvoice.domain.Company;
import rxinvoice.domain.Invoice;
import rxinvoice.domain.report.InvoiceActivity;

import javax.inject.Named;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.CORS;
import static rxinvoice.AppModule.Roles.SELLER;


@Component
@RestxResource
public class CorsResource {

    private final JongoCollection companies;
    private final JongoCollection invoices;

    public CorsResource(@Named("companies") JongoCollection companies, @Named("invoices") JongoCollection invoices) {
        this.companies = companies;
        this.invoices = invoices;
    }

    @RolesAllowed({CORS})
    @GET("/cors/companies")
    public Iterable<Company> findCompanies() {
        return companies.get().find().as(Company.class);
    }

    @RolesAllowed({CORS})
    @GET("/cors/invoices/seller/{companyKey}/{businessRef}")
    public Iterable<Invoice> findInvoiceBySeller(String companyKey, String businessRef) {
        return invoices.get().find("{buyer._id: #, business.reference: #}", new ObjectId(companyKey), businessRef).as(Invoice.class);
    }

    @RolesAllowed({CORS})
    @POST("/cors/business")
    public Object createBusiness(Map<String, Object> params) {
        String companyId = (String) params.get("company");
        String businessName = (String) params.get("business");
        Business business = null;
        if (businessName != null) {
            Company company = companies.get().findOne(new ObjectId(companyId)).as(Company.class);
            if (company != null && !companyContainsBusiness(company, businessName)) {
                business = new Business()
                        .setName(businessName)
                        .setReference(UUID.randomUUID().toString());
                company.getBusiness().add(business);
                companies.get().save(company);
            }
        }
        return business;
    }
    private boolean companyContainsBusiness(Company company, String businessName) {
        for (Business business : company.getBusiness()) {
            if (business.getName().equals(businessName)) {
                return true;
            }
        }
        return false;
    }

    @RolesAllowed({ADMIN, SELLER, CORS})
    @GET("/cors/report/activity")
    public List<InvoiceActivity> reportActivity(Optional<String> from, Optional<String> to) {
        Map<String, String> cacheCompanyKind = new TreeMap<>();
        Date fromDate = new Date();
        Date toDate = new Date();
        if (from.isPresent()) {
            try {
                fromDate = new SimpleDateFormat("yyyyMMdd").parse(from.get());
            } catch (ParseException e) {
                throw new IllegalArgumentException("from has been wrong format: yyyyMMdd is expected");
            }
        }
        if (to.isPresent()) {
            try {
                toDate = new SimpleDateFormat("yyyyMMdd").parse(to.get());
            } catch (ParseException e) {
                throw new IllegalArgumentException("to has been wrong format: yyyyMMdd is expected");
            }
        }
        List<InvoiceActivity> results = new ArrayList<>();
        Iterable<Invoice> invoicesFound = invoices.get().find("{ $and: [ { date: { $gte: # } } , { date: { $lte: # } } ] }", fromDate, toDate).as(Invoice.class);
        for (Invoice invoice : invoicesFound) {
            if (invoice.getActivities() == null || invoice.getActivities().isEmpty()) {
                results.add(compute(cacheCompanyKind, invoice, Invoice.Activity.UNKNOWN, new BigDecimal(100)));
            } else {
                for (Invoice.ActivityValue activityValue : invoice.getActivities()) {
                    results.add(compute(cacheCompanyKind, invoice, activityValue.getActivity(), activityValue.getValue()));
                }
            }
        }

        results.remove(null);
        return results;
    }

    private InvoiceActivity compute(Map<String, String> cacheCompanyKind, Invoice invoice, Invoice.Activity activity, BigDecimal value) {
        BigDecimal percent = value.divide(new BigDecimal(100));
        BigDecimal activityGrossAmount = invoice.getGrossAmount().multiply(percent);
        BigDecimal activityNetAmount = invoice.getNetAmount().multiply(percent);
        String buyerType = cacheCompanyKind.get(invoice.getBuyer().getKey());
        if (buyerType == null) {
            Company company = companies.get().findOne(new ObjectId(invoice.getBuyer().getKey())).as(Company.class);
            buyerType = getEnumName(company.getKind());
            cacheCompanyKind.put(company.getKey(), buyerType);
        }
        return new InvoiceActivity()
                .setActivity(getEnumName(activity))
                .setGrossAmount(activityGrossAmount)
                .setNetAmount(activityNetAmount)
                .setPercent(value)
                .setType(getEnumName(invoice.getKind()))
                .setBusiness(invoice.getBusiness() == null ? StringUtils.EMPTY : invoice.getBusiness().getName())
                .setBusinessType(null)
                .setBuyer(invoice.getBuyer() == null ? StringUtils.EMPTY : invoice.getBuyer().getName())
                .setBuyerType(buyerType)
                .setDate(invoice.getDate().toDate())
                .setStatus(getEnumName(invoice.getStatus()));
    }

    private String getEnumName(Enum enumeration) {
        if (enumeration == null) {
            return StringUtils.EMPTY;
        }
        return enumeration.name();
    }
}
