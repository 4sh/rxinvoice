package rxinvoice.domain.invoice;

import restx.jackson.FixedPrecision;
import rxinvoice.domain.print.VATAmountPrint;

import java.math.BigDecimal;

public class VATAmount {

    private String label;
    @FixedPrecision(2)
    private BigDecimal amount = BigDecimal.ZERO;

    public VATAmountPrint toVatAmountView() {
        return new VATAmountPrint(this);
    }

    @Override
    public String toString() {
        return "VATAmount{" +
                "vat='" + label + '\'' +
                ", amount=" + amount +
                '}';
    }

    public String getLabel() {
        return label;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public VATAmount setLabel(String label) {
        this.label = label;
        return this;
    }

    public VATAmount setAmount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

}