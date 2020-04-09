package rxinvoice.service.invoice;

import com.google.common.collect.Lists;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import restx.factory.Component;
import restx.i18n.Messages;
import rxinvoice.domain.invoice.VATAmount;
import rxinvoice.domain.invoice.Invoice;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.Locale;
import java.util.stream.Collectors;

import static rxinvoice.service.utils.ExcelExportUtils.createCell;

@Component
public class InvoiceExportService {
    private static final int REFERENCE = 0;
    private static final int KIND = 1;
    private static final int BUYER = 2;
    private static final int BUSINESS = 3;
    private static final int OBJECT = 4;
    private static final int DATE = 5;
    private static final int STATUS = 6;
    private static final int GROSS_AMOUNT = 7;
    private static final int NET_AMOUNT = 8;
    private static final int VAT = 9;
    private final Messages messages;

    public InvoiceExportService(Messages messages) {
        this.messages = messages;
    }

    public void exportInvoices(Iterable<Invoice> invoices, OutputStream outputStream) throws IOException {
        // Sort by reference then by date for export only
        invoices = Lists.newArrayList(invoices).stream().sorted(
                Comparator
                        .comparing(Invoice::getReference,
                                Comparator.nullsLast(Comparator.naturalOrder()))
                        .thenComparing(Invoice::getDate,
                                Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());

        XSSFWorkbook myWorkBook = new XSSFWorkbook();
        XSSFSheet mySheet = myWorkBook.createSheet();

        writeHeaderRow(mySheet.createRow(0));

        int rowCounter = 1;

        for (Invoice invoice : invoices) {
            XSSFRow row = mySheet.createRow(rowCounter);
            writeRow(row, invoice);
            rowCounter++;
        }

        myWorkBook.write(outputStream);
    }

    private void writeRow(XSSFRow row, Invoice invoice) {
        createCell(row, REFERENCE, invoice.getReference());
        if (invoice.getKind() != null) {
            createCell(row, KIND, invoice.getKind().name());
        }
        if (invoice.getBuyer() != null) {
            createCell(row, BUYER, invoice.getBuyer().getName());
        }
        if (invoice.getBusiness() != null) {
            createCell(row, BUSINESS, invoice.getBusiness().getName());
        }
        createCell(row, OBJECT, invoice.getObject());
        createCell(row, DATE, invoice.getDate());
        createCell(row, STATUS, messages.getMessage("invoice.status." + invoice.getStatus().name()));
        createCell(row, GROSS_AMOUNT, invoice.getGrossAmount());
        createCell(row, NET_AMOUNT, invoice.getNetAmount());

        BigDecimal sumOfVatAmounts = BigDecimal.ZERO;

        for (VATAmount vatAmount : invoice.getVatsAmount()) {
            sumOfVatAmounts = sumOfVatAmounts.add(vatAmount.getAmount());
        }

        createCell(row, VAT, sumOfVatAmounts);
    }

    private void writeHeaderRow(XSSFRow row) {
        createCell(row, REFERENCE, messages.getMessage("invoice.reference", Locale.FRENCH));
        createCell(row, KIND, messages.getMessage("invoice.kind", Locale.FRENCH));
        createCell(row, BUYER, messages.getMessage("invoice.buyer", Locale.FRENCH));
        createCell(row, BUSINESS, messages.getMessage("invoice.business", Locale.FRENCH));
        createCell(row, OBJECT, messages.getMessage("invoice.object", Locale.FRENCH));
        createCell(row, DATE, messages.getMessage("invoice.date", Locale.FRENCH));
        createCell(row, STATUS, messages.getMessage("invoice.status", Locale.FRENCH));
        createCell(row, GROSS_AMOUNT, messages.getMessage("invoice.lines.grossAmount", Locale.FRENCH));
        createCell(row, NET_AMOUNT, messages.getMessage("invoice.lines.netAmount", Locale.FRENCH));
        createCell(row, VAT, messages.getMessage("invoice.vats", Locale.FRENCH));
    }
}
