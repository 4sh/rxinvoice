package rxinvoice.domain.invoice;

import restx.jackson.FixedPrecision;
import rxinvoice.domain.company.VATRate;
import rxinvoice.domain.print.InvoiceLinePrint;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class Line {

    private String description;
    private VATRate vatRate;

    @FixedPrecision(2)
    private BigDecimal quantity;

    @FixedPrecision(2)
    private BigDecimal unitCost;

    @FixedPrecision(2)
    private BigDecimal grossAmount;

    /**
     * Compute the line gross amount based on unit cost and quantity.
     *
     * @return 0 if unit cost or no quantity present, unit cost * quantity instead.
     */
    public BigDecimal computeGrossAmount() {
        BigDecimal grossAmount = BigDecimal.ZERO;
        if (null != unitCost && null != quantity) {
            grossAmount = this.unitCost.multiply(this.quantity);
        }
        return grossAmount.setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Compute the vat amount of this invoice line based on the gross amount and the vat rate.
     *
     * @return 0 if no vat rate present or gross amount * vat rate if vat is present.
     */
    public BigDecimal computeVatAmount() {
        BigDecimal vatAmount = BigDecimal.ZERO;
        if (null != vatRate && null != vatRate.getRate() && null != grossAmount) {
            vatAmount = this.grossAmount
                    .multiply(this.vatRate.getRate())
                    .divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_EVEN);
        }
        return vatAmount.setScale(2, RoundingMode.HALF_UP);
    }

    public InvoiceLinePrint toInvoiceLinePrint() {
        return new InvoiceLinePrint(this);
    }

    @Override
    public String toString() {
        return "Line{" +
                "description='" + description + '\'' +
                ", quantity=" + quantity +
                ", unitCost=" + unitCost +
                ", grossAmount=" + grossAmount +
                ", vatRate=" + vatRate +
                '}';
    }

    public String getDescription() {
        return description;
    }

    public Line setDescription(String description) {
        this.description = description;
        return this;
    }

    public VATRate getVatRate() {
        return vatRate;
    }

    public Line setVatRate(VATRate vatRate) {
        this.vatRate = vatRate;
        return this;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public Line setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
        return this;
    }

    public BigDecimal getUnitCost() {
        return unitCost;
    }

    public Line setUnitCost(BigDecimal unitCost) {
        this.unitCost = unitCost;
        return this;
    }

    public BigDecimal getGrossAmount() {
        return grossAmount;
    }

    public Line setGrossAmount(BigDecimal grossAmount) {
        this.grossAmount = grossAmount;
        return this;
    }
}
