package rxinvoice.domain.print;

import rxinvoice.domain.invoice.VATAmount;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class VATAmountPrint {
    private String vat;
    private String amount;

    public VATAmountPrint(VATAmount vatAmount) {
        this.vat = vatAmount.getLabel();
        this.amount = PrintUtils.NUMBER_FORMAT.format((vatAmount.getAmount() == null)
                ? BigDecimal.ZERO
                : vatAmount.getAmount().setScale(2, RoundingMode.HALF_EVEN));
    }

    @Override
    public String toString() {
        return "VATAmountView{" +
                "vat='" + vat + '\'' +
                ", amount='" + amount + '\'' +
                '}';
    }

    public String getVat() {
        return vat;
    }

    public VATAmountPrint setVat(String vat) {
        this.vat = vat;
        return this;
    }

    public String getAmount() {
        return amount;
    }

    public VATAmountPrint setAmount(String amount) {
        this.amount = amount;
        return this;
    }
}