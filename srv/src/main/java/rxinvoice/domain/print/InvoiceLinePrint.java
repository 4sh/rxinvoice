package rxinvoice.domain.print;

import rxinvoice.domain.invoice.Line;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class InvoiceLinePrint {
    private String description;
    private VATRatePrint vat;

    private String quantity;
    private String unitCost;
    private String grossAmount;

    public InvoiceLinePrint(Line line) {
        this.description = line.getDescription();
        this.vat = line.getVat() == null ? null : line.getVat().toVatView();
        this.quantity = (line.getQuantity() == null ? BigDecimal.ZERO : line.getQuantity())
                .setScale(2, RoundingMode.HALF_EVEN).toString();
        this.unitCost = PrintUtils.NUMBER_FORMAT.format(line.getUnitCost() == null
                ? BigDecimal.ZERO
                : line.getUnitCost().setScale(2, RoundingMode.HALF_EVEN));
        this.grossAmount = line.getGrossAmount() == null
                ? ""
                : PrintUtils.NUMBER_FORMAT.format(line.getGrossAmount().setScale(2, RoundingMode.HALF_EVEN));
    }

    @Override
    public String toString() {
        return "LineView{" +
                "description='" + description + '\'' +
                ", vat=" + vat +
                ", quantity='" + quantity + '\'' +
                ", unitCost='" + unitCost + '\'' +
                ", grossAmount='" + grossAmount + '\'' +
                '}';
    }

    public String getDescription() {
        return description;
    }

    public InvoiceLinePrint setDescription(String description) {
        this.description = description;
        return this;
    }

    public VATRatePrint getVat() {
        return vat;
    }

    public InvoiceLinePrint setVat(VATRatePrint vat) {
        this.vat = vat;
        return this;
    }

    public String getQuantity() {
        return quantity;
    }

    public InvoiceLinePrint setQuantity(String quantity) {
        this.quantity = quantity;
        return this;
    }

    public String getUnitCost() {
        return unitCost;
    }

    public InvoiceLinePrint setUnitCost(String unitCost) {
        this.unitCost = unitCost;
        return this;
    }

    public String getGrossAmount() {
        return grossAmount;
    }

    public InvoiceLinePrint setGrossAmount(String grossAmount) {
        this.grossAmount = grossAmount;
        return this;
    }
}