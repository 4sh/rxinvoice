package rxinvoice.domain.invoice;

import restx.jackson.FixedPrecision;
import rxinvoice.domain.print.VATValPrint;

import java.math.BigDecimal;

public class VATVal {
    private String vat;

    @FixedPrecision(2)
    private BigDecimal amount;

    public String getVat() {
        return vat;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public VATVal setVat(final String vat) {
        this.vat = vat;
        return this;
    }

    public VATVal setAmount(final BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    @Override
    public String toString() {
        return "VATVal{" +
                "vat=" + vat +
                ", amount=" + amount +
                '}';
    }

    public VATValPrint toVatView() {
        return new VATValPrint(this);
    }


}