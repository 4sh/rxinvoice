package rxinvoice.domain.invoice;

import org.junit.jupiter.api.Test;
import rxinvoice.domain.company.VATRate;

import java.math.BigDecimal;
import java.math.RoundingMode;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

class LineTest {

    @Test
    void should_compute_gross_amount() {
        Line line = new Line()
                .setUnitCost(BigDecimal.valueOf(47.5))
                .setQuantity(BigDecimal.valueOf(10));
        assertThat(line.computeGrossAmount(), is(equalTo(BigDecimal.valueOf(475).setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_gross_amount_with_missing_unit_cost() {
        Line line = new Line()
                .setUnitCost(null)
                .setQuantity(BigDecimal.valueOf(10));
        assertThat(line.computeGrossAmount(), is(equalTo(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_gross_amount_with_missing_quantity() {
        Line line = new Line()
                .setQuantity(null)
                .setUnitCost(BigDecimal.valueOf(10));
        assertThat(line.computeGrossAmount(), is(equalTo(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_gross_amount_with_missing_both_unit_cost_and_quantity() {
        Line line = new Line()
                .setQuantity(null)
                .setUnitCost(null);
        assertThat(line.computeGrossAmount(), is(equalTo(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_vat_amount_with_missing_gross_amount() {
        VATRate vatRate = new VATRate().setRate(BigDecimal.valueOf(20));
        Line line = new Line()
                .setVat(vatRate)
                .setGrossAmount(null);
        assertThat(line.computeVatAmount(), is(equalTo(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_vat_amount_with_missing_line_vat() {
        VATRate vatRate = new VATRate().setRate(null);
        Line line = new Line()
                .setVat(vatRate)
                .setGrossAmount(BigDecimal.valueOf(500));
        assertThat(line.computeVatAmount(), is(equalTo(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_vat_amount_with_missing_vat_rate() {
        VATRate vatRate = new VATRate().setRate(BigDecimal.valueOf(20));
        Line line = new Line()
                .setVat(vatRate)
                .setGrossAmount(BigDecimal.valueOf(1000));
        assertThat(line.computeVatAmount(), is(equalTo(BigDecimal.valueOf(200).setScale(2, RoundingMode.HALF_UP))));
    }

}