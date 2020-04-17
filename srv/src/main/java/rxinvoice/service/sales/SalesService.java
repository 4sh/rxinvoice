package rxinvoice.service.sales;

import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import rxinvoice.AppModule;
import rxinvoice.domain.accountant.AccountantServiceReference;
import rxinvoice.domain.company.CommercialRelationship;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.company.SellerSettings;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.invoice.VATAmount;
import rxinvoice.service.company.CommercialRelationshipService;
import rxinvoice.service.company.CompanyService;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static rxinvoice.utils.MoreJ8Preconditions.checkPresent;

@Component
public class SalesService {
    private static final Logger logger = LoggerFactory.getLogger(SalesService.class);

    private final CompanyService companyService;
    private final CommercialRelationshipService commercialRelationshipService;

    public SalesService(CompanyService companyService,
                        CommercialRelationshipService commercialRelationshipService) {
        this.companyService = companyService;
        this.commercialRelationshipService = commercialRelationshipService;
    }

    public List<SaleLine> buildSalesReport(Iterable<Invoice> invoices) {

        String userCompanyRef = AppModule.currentUser().getCompanyRef();
        Company company = checkPresent(this.companyService.findByKey(userCompanyRef),
                String.format("Company not found for key: %s", userCompanyRef));

        Map<String, CommercialRelationship> commercialRelationshipMap =
                StreamSupport.stream(this.commercialRelationshipService.findAll().spliterator(), false)
                        .collect(Collectors.toMap(CommercialRelationship::getCustomerRef,
                                commercialRelationship -> commercialRelationship,
                                (commercialRelationship1, commercialRelationship2) -> commercialRelationship1));


        List<SaleLine> saleLines = Lists.newArrayList();
        for (Invoice invoice : invoices) {
            saleLines.add(extractCustomerAccountLine(commercialRelationshipMap, invoice));
            saleLines.add(extractServiceAccountLine(company.getSellerSettings(), invoice));
            extractVatAccountLine(company.getSellerSettings(), invoice).ifPresent(saleLines::add);
        }
        return saleLines.stream().sorted(
                Comparator
                        .comparing(SaleLine::getReference,
                                Comparator.nullsLast(Comparator.naturalOrder()))
                        .thenComparing(SaleLine::getInvoiceDate,
                                Comparator.nullsLast(Comparator.naturalOrder())))
                .collect(Collectors.toList());
    }

    public Optional<SaleLine> extractVatAccountLine(SellerSettings sellerSettings, Invoice invoice) {
        if (!invoice.isWithVAT()) {
            return Optional.empty();
        }
        BigDecimal vatRate = null;
        if (invoice.getVatRates() != null
                && !invoice.getVatRates().isEmpty()
                && invoice.getVatRates().get(0) != null
                && invoice.getVatRates().get(0).getRate() != null) {
            vatRate = invoice.getVatRates().get(0).getRate();
        }
        SaleLine saleLine = SaleLine.build(invoice);
        Optional<AccountantServiceReference> serviceReferenceOptional =
                sellerSettings.findServiceReference(invoice.getKind(), vatRate);
        serviceReferenceOptional.ifPresent(serviceReference -> {
            BigDecimal vatAmount = invoice.getVatsAmount()
                    .stream()
                    .map(VATAmount::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            saleLine
                    .setAccount(serviceReference.getVatRate() == null ? "ERROR" : serviceReference.getVatRate().getAccountNumber())
                    .setDebit(invoice.isCredit() ? vatAmount.negate() : BigDecimal.ZERO)
                    .setCredit(invoice.isCredit() ? BigDecimal.ZERO : vatAmount);
        });
        return Optional.of(saleLine);
    }

    public SaleLine extractServiceAccountLine(SellerSettings sellerSettings, Invoice invoice) {
        BigDecimal vatRate = null;
        if (invoice.isWithVAT()
                && null != invoice.getVatRates()
                && !invoice.getVatRates().isEmpty()
                && null != invoice.getVatRates().get(0)
                && null != invoice.getVatRates().get(0).getRate()) {
            vatRate = invoice.getVatRates().get(0).getRate();
        }
        logger.debug("{}",invoice.getReference());
        Optional<AccountantServiceReference> serviceReferenceOptional = sellerSettings.findServiceReference(invoice.getKind(), vatRate);
        SaleLine saleLine = SaleLine.build(invoice);
        serviceReferenceOptional.ifPresent(serviceReference ->
                saleLine
                        .setAccount(serviceReference.getAccountNumber())
                        .setDebit(invoice.isCredit() ? invoice.getGrossAmount().negate() : BigDecimal.ZERO)
                        .setCredit(invoice.isCredit() ? BigDecimal.ZERO : invoice.getGrossAmount()));
        return saleLine;
    }

    public SaleLine extractCustomerAccountLine(Map<String, CommercialRelationship> commercialRelationshipMap, Invoice invoice) {
        CommercialRelationship commercialRelationship = commercialRelationshipMap.get(invoice.getBuyer().getKey());
        return SaleLine.build(invoice)
                .setAccount(commercialRelationship == null ? "NOT FOUND" : commercialRelationship.getAccountantReference())
                .setCredit(invoice.isCredit() ? invoice.getNetAmount().negate() : BigDecimal.ZERO)
                .setDebit(invoice.isCredit() ? BigDecimal.ZERO : invoice.getNetAmount());
    }

}
