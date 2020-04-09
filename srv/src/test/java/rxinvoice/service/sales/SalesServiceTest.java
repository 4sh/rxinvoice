package rxinvoice.service.sales;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import restx.factory.Factory;
import restx.factory.Name;
import rxinvoice.domain.accountant.AccountantServiceReference;
import rxinvoice.domain.company.SellerSettings;
import rxinvoice.domain.company.VATRate;
import rxinvoice.domain.enumeration.ServiceKind;
import rxinvoice.domain.invoice.Invoice;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertTrue;


class SalesServiceTest {

    private final ObjectMapper mapper = Factory.getInstance().getComponent(Name.of(ObjectMapper.class, "FrontObjectMapper"));
    private final SalesService salesService = Factory.getInstance().getComponent(SalesService.class);
    private static VATRate vatRate1;
    private static VATRate vatRate2;
    private static SellerSettings sellerSettings;

    @BeforeAll
    public static void buildSellerSettings() {
        sellerSettings = new SellerSettings();
        vatRate1 = new VATRate()
                .setRate(BigDecimal.valueOf(20))
                .setAccountNumber("445711")
                .setLabel("VAT 20 %");

        vatRate2 = new VATRate()
                .setRate(BigDecimal.valueOf(8.5))
                .setAccountNumber("445712")
                .setLabel("VAT 8.5 %");

        AccountantServiceReference accountantServiceReference1 = new AccountantServiceReference()
                .setAccountNumber("706114")
                .setKind(ServiceKind.HOSTING)
                .setVatRate(vatRate1);
        AccountantServiceReference accountantServiceReference2 = new AccountantServiceReference()
                .setAccountNumber("706112")
                .setKind(ServiceKind.TRAINING)
                .setVatRate(vatRate2);

        sellerSettings.getServiceReferenceList().add(accountantServiceReference1);
        sellerSettings.getServiceReferenceList().add(accountantServiceReference2);
    }

    @Test
    void exportSales() {
    }

    @Test
    void should_extract_vat_account_line() throws IOException {
        Invoice invoice = mapper.readValue(new File("src/test/resources/invoices/invoice_190385.json"), Invoice.class);

        Optional<SaleLine> saleLineOptional = this.salesService.extractVatAccountLine(sellerSettings, invoice);
        assertTrue(saleLineOptional.isPresent());
        SaleLine saleLine = saleLineOptional.get();
        assertThat(saleLine.getInvoiceDate(), is(equalTo(invoice.getDate())));
        assertThat(saleLine.getReference(), is(equalTo(invoice.getReference())));
        assertThat(saleLine.getAccount(), is(equalTo(vatRate1.getAccountNumber())));
        assertThat(saleLine.getLabel(), is(equalTo("DAM'S DAMS4ME- ENV - 2019 1er trimestre 2020")));
        assertThat(saleLine.getDebit(), is(equalTo(BigDecimal.ZERO)));
        assertThat(saleLine.getCredit(), is(equalTo(BigDecimal.valueOf(120))));

    }

    @Test
    void should_extract_service_account_line() throws IOException {
        Invoice invoice = mapper.readValue(new File("src/test/resources/invoices/invoice_190385.json"), Invoice.class);

        SaleLine saleLine = this.salesService.extractServiceAccountLine(sellerSettings, invoice);

        assertThat(saleLine.getInvoiceDate(), is(equalTo(invoice.getDate())));
        assertThat(saleLine.getReference(), is(equalTo(invoice.getReference())));
        assertThat(saleLine.getAccount(), is(equalTo("706114")));
        assertThat(saleLine.getLabel(), is(equalTo("DAM'S DAMS4ME- ENV - 2019 1er trimestre 2020")));
        assertThat(saleLine.getDebit(), is(equalTo(BigDecimal.ZERO)));
        assertThat(saleLine.getCredit(), is(equalTo(BigDecimal.valueOf(600))));
    }

    @Test
    void should_extract_customer_account_line() throws IOException {
        Invoice invoice = mapper.readValue(new File("src/test/resources/invoices/invoice_190385.json"), Invoice.class);

//        SaleLine saleLine = this.salesService.extractCustomerAccountLine(commercialRelationshipMap, invoice);
//
//        assertThat(saleLine.getInvoiceDate(), is(equalTo(invoice.getDate())));
//        assertThat(saleLine.getReference(), is(equalTo(invoice.getReference())));
//        assertThat(saleLine.getAccount(), is(equalTo(invoice.getBusiness().getAccountantReference())));
//        assertThat(saleLine.getLabel(), is(equalTo("DAM'S DAMS4ME- ENV - 2019 1er trimestre 2020")));
//        assertThat(saleLine.getDebit(), is(equalTo(BigDecimal.valueOf(720))));
//        assertThat(saleLine.getCredit(), is(equalTo(BigDecimal.ZERO)));

    }
}