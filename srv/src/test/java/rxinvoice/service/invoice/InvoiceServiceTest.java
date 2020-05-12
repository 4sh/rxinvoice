package rxinvoice.service.invoice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import org.junit.jupiter.api.Test;
import restx.factory.Factory;
import restx.factory.Name;
import rxinvoice.domain.company.VATRate;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.domain.invoice.Line;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

class InvoiceServiceTest {

    private final InvoiceService invoiceService = Factory.getInstance().getComponent(InvoiceService.class);
    private final VATRate rate_8_5 = new VATRate().setLabel("Taux à 8,5%").setRate(BigDecimal.valueOf(8.5));
    private final VATRate rate_20 = new VATRate().setLabel("Taux à 20%").setRate(BigDecimal.valueOf(20));

    @Test
    void should_update_gross_amount() throws IOException {
        ObjectMapper mapper = Factory.getInstance().getComponent(Name.of(ObjectMapper.class, "FrontObjectMapper"));
        Invoice invoice = mapper.readValue(new File("src/test/resources/invoices/invoice_190385.json"), Invoice.class);
        invoice.setGrossAmount(null)
                .setVatsAmount(null)
                .setNetAmount(null);
        this.invoiceService.updateAmounts(invoice);
        assertThat(invoice.getGrossAmount(), is(equalTo(BigDecimal.valueOf(600).setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_update_gross_net_amount() throws IOException {
        ObjectMapper mapper = Factory.getInstance().getComponent(Name.of(ObjectMapper.class, "FrontObjectMapper"));
        Invoice invoice = mapper.readValue(new File("src/test/resources/invoices/invoice_190385.json"), Invoice.class);
        invoice.setGrossAmount(null)
                .setVatsAmount(null)
                .setNetAmount(null);
        this.invoiceService.updateAmounts(invoice);
        assertThat(invoice.getNetAmount(), is(equalTo(BigDecimal.valueOf(720).setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_update_vat_amount_one_rate() throws IOException {
        ObjectMapper mapper = Factory.getInstance().getComponent(Name.of(ObjectMapper.class, "FrontObjectMapper"));
        Invoice invoice = mapper.readValue(new File("src/test/resources/invoices/invoice_190385.json"), Invoice.class);
        invoice.setGrossAmount(null)
                .setVatsAmount(null)
                .setNetAmount(null);
        this.invoiceService.updateAmounts(invoice);
        assertThat(invoice.getVatsAmount().get(0).getAmount(),
                is(equalTo(BigDecimal.valueOf(120).setScale(2, RoundingMode.HALF_UP))));
        assertThat(invoice.getVatsAmount().get(0).getLabel(), is(invoice.getVatRates().get(0).getLabel()));
    }

    @Test
    void should_update_vat_amount_multiple_rates() {
        List<Line> lines = Lists.newArrayList(
                new Line().setQuantity(null).setUnitCost(BigDecimal.valueOf(1000)).setVatRate(rate_8_5),
                new Line().setQuantity(BigDecimal.valueOf(45)).setUnitCost(null).setVatRate(rate_20),
                new Line().setQuantity(BigDecimal.valueOf(45)).setUnitCost(BigDecimal.valueOf(1000)).setVatRate(rate_8_5),
                new Line().setQuantity(BigDecimal.valueOf(1)).setUnitCost(BigDecimal.valueOf(24000)).setVatRate(rate_8_5),
                new Line().setQuantity(BigDecimal.valueOf(3)).setUnitCost(BigDecimal.valueOf(5000)).setVatRate(rate_8_5),
                new Line().setQuantity(BigDecimal.valueOf(5)).setUnitCost(BigDecimal.valueOf(6000)).setVatRate(rate_20),
                new Line().setQuantity(BigDecimal.valueOf(10)).setUnitCost(BigDecimal.valueOf(800)).setVatRate(rate_20),
                new Line().setQuantity(null).setUnitCost(null).setVatRate(rate_8_5)
        );
        Invoice invoice = new Invoice().setLines(lines).setVatRates(
                Lists.newArrayList(rate_8_5, rate_20));
        this.invoiceService.updateAmounts(invoice);
        assertThat(invoice.getVatsAmount().get(0).getAmount(),
                is(equalTo(BigDecimal.valueOf(7140).setScale(2, RoundingMode.HALF_UP))));
        assertThat(invoice.getVatsAmount().get(1).getAmount(),
                is(equalTo(BigDecimal.valueOf(7600).setScale(2, RoundingMode.HALF_UP))));

        assertThat(invoice.getVatsAmount().get(0).getLabel(), is(invoice.getVatRates().get(0).getLabel()));
        assertThat(invoice.getVatsAmount().get(1).getLabel(), is(invoice.getVatRates().get(1).getLabel()));
    }


    @Test
    void should_update_vat_rates_no_rate() {
        Invoice invoice = new Invoice().setLines(Lists.newArrayList(new Line().setVatRate(rate_20)));
        this.invoiceService.updateVatRates(invoice);
        assertThat(invoice.getVatRates().size(), is(equalTo(1)));
        assertThat(invoice.getVatRates().get(0).getRate(), is(equalTo(rate_20.getRate())));
        assertThat(invoice.getVatRates().get(0).getLabel(), is(equalTo(rate_20.getLabel())));
    }

    @Test
    void should_update_vat_rates_multiple_lines_with_no_rate() {
        Invoice invoice = new Invoice().setLines(Lists.newArrayList(
                new Line().setVatRate(rate_20),
                new Line().setVatRate(null),
                new Line().setVatRate(rate_8_5)));
        this.invoiceService.updateVatRates(invoice);
        assertThat(invoice.getVatRates().size(), is(equalTo(2)));
        assertThat(invoice.getVatRates().get(0).getRate(), is(equalTo(rate_20.getRate())));
        assertThat(invoice.getVatRates().get(0).getLabel(), is(equalTo(rate_20.getLabel())));
        assertThat(invoice.getVatRates().get(1).getRate(), is(equalTo(rate_8_5.getRate())));
        assertThat(invoice.getVatRates().get(1).getLabel(), is(equalTo(rate_8_5.getLabel())));
    }
}
