package rxinvoice.domain.print;

import rxinvoice.domain.company.VATRate;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class VATRatePrint {

    private String label;
    private String rate;

    public VATRatePrint(VATRate vatRate) {
        this.label = vatRate.getLabel();
        this.rate = PrintUtils.NUMBER_FORMAT.format((vatRate.getRate() == null)
                ? BigDecimal.ZERO
                : vatRate.getRate().setScale(2, RoundingMode.HALF_EVEN));
    }

    @Override
    public String toString() {
        return "VATRatePrint{" +
                "label='" + label + '\'' +
                ", rate='" + rate + '\'' +
                '}';
    }

    public String getLabel() {
        return label;
    }

    public VATRatePrint setLabel(String label) {
        this.label = label;
        return this;
    }

    public String getRate() {
        return rate;
    }

    public VATRatePrint setRate(String rate) {
        this.rate = rate;
        return this;
    }
}
