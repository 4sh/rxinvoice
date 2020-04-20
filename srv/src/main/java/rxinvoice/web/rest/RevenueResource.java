package rxinvoice.web.rest;

import org.joda.time.LocalDate;
import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import rxinvoice.AppModule;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.company.FiscalYear;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.Revenue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestxResource
@Component
public class RevenueResource {
    private final InvoiceResource invoiceResource;
    private final CompanyResource companyResource;

    public RevenueResource(InvoiceResource invoiceResource, CompanyResource companyResource) {
        this.invoiceResource = invoiceResource;
        this.companyResource = companyResource;
    }

    @GET("/revenues/fiscal")
    public Iterable<Revenue> getFiscalYearRevenues() {
        Optional<Company> company = companyResource.findCompanyByKey(AppModule.currentUser().getCompanyRef());
        FiscalYear fiscalYear =
                company.isPresent() ? company.get().getFiscalYear().current() : FiscalYear.DEFAULT;
        FiscalYear previousFiscalYear = fiscalYear.previous();
        FiscalYear nextFiscalYear = fiscalYear.next();

        return Arrays.asList(
                computeRevenue(previousFiscalYear.getStart(), previousFiscalYear.getEnd(), Revenue.PeriodType.YEARLY),
                computeRevenue(fiscalYear.getStart(), fiscalYear.getEnd(), Revenue.PeriodType.YEARLY),
                computeRevenue(nextFiscalYear.getStart(), nextFiscalYear.getEnd(), Revenue.PeriodType.YEARLY));
    }

    @GET("/revenues/monthly")
    public Iterable<Revenue> getMonthlyRevenues(Optional<LocalDate> from, Optional<LocalDate> to) {
        LocalDate fromMonth = from.orElse(LocalDate.now().minusMonths(5)).withDayOfMonth(1);
        LocalDate toMonth = to.orElse(LocalDate.now());
        List<Revenue> revenues = new ArrayList<>();

        while (fromMonth.isBefore(toMonth)) {
            revenues.add(computeRevenue(fromMonth, fromMonth.plusMonths(1).minusDays(1), Revenue.PeriodType.MONTHLY));
            fromMonth = fromMonth.plusMonths(1);
        }

        return revenues;
    }

    private Revenue computeRevenue(LocalDate from, LocalDate to, Revenue.PeriodType periodType) {
        Revenue revenue = new Revenue()
                .setFrom(from)
                .setTo(to)
                .setPeriodType(periodType);
        Iterable<Invoice> invoices = invoiceResource.findInvoicesByDates(from.toString(), to.toString());
        for (Invoice invoice : invoices) {
            switch (invoice.getStatus()) {
                case PAID:
                    revenue.setPaid(revenue.getPaid().add(invoice.getGrossAmount()));
                    break;
                default:
                    revenue.setInvoiced(revenue.getInvoiced().add(invoice.getGrossAmount()));
                    break;
            }
        }

        return revenue;
    }
}
