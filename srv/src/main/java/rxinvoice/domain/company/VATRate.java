package rxinvoice.domain.company;

import restx.jackson.FixedPrecision;
import rxinvoice.domain.print.VATRatePrint;

import java.math.BigDecimal;

/**
 * VAT rate is used by seller companies to configure the default VAT rates
 * available to build invoices for their customers.
 */
public class VATRate {

    /**
     * The VAT rate label.
     */
    private String label;
    /**
     * The VAT rate to be applied.
     */
    @FixedPrecision(2)
    private BigDecimal rate;

    @Override
    public String toString() {
        return "VATRate{" +
                "label='" + label + '\'' +
                ", rate=" + rate +
                '}';
    }

    public String getLabel() {
        return label;
    }

    public VATRate setLabel(String label) {
        this.label = label;
        return this;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public VATRate setRate(BigDecimal rate) {
        this.rate = rate;
        return this;
    }

    public VATRatePrint toVatView() {
        return new VATRatePrint(this);
    }
}
