package rxinvoice.domain.invoice;

import com.google.common.collect.Lists;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

class InvoiceTest {

    @Test
    void should_compute_gross_amount_with_no_lines() {
        Invoice invoice = new Invoice();
        assertThat(invoice.computeGrossAmount(),
                is(equalTo(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_gross_amount_with_one_empty_line() {
        List<Line> lines = Lists.newArrayList(new Line());
        Invoice invoice = new Invoice().setLines(lines);
        assertThat(invoice.computeGrossAmount(),
                is(equalTo(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_gross_amount_with_one_line_gross_amount_empty() {
        List<Line> lines = Lists.newArrayList(new Line().setGrossAmount(null));
        Invoice invoice = new Invoice().setLines(lines);
        assertThat(invoice.computeGrossAmount(),
                is(equalTo(BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_gross_amount_with_one_line() {
        List<Line> lines = Lists.newArrayList(new Line().setGrossAmount(BigDecimal.valueOf(34.7)));
        Invoice invoice = new Invoice().setLines(lines);
        assertThat(invoice.computeGrossAmount(),
                is(equalTo(BigDecimal.valueOf(34.70).setScale(2, RoundingMode.HALF_UP))));
    }

    @Test
    void should_compute_gross_amount_with_multiple_lines() {
        List<Line> lines = Lists.newArrayList(
                new Line(),
                new Line().setGrossAmount(null),
                new Line().setGrossAmount(BigDecimal.valueOf(34.7)),
                new Line().setGrossAmount(BigDecimal.valueOf(51.8)));

        Invoice invoice = new Invoice().setLines(lines);
        assertThat(invoice.computeGrossAmount(),
                is(equalTo(BigDecimal.valueOf(86.5).setScale(2, RoundingMode.HALF_UP))));
    }
}