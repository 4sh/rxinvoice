package rxinvoice.service.sales;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import restx.factory.Component;
import restx.i18n.Messages;
import rxinvoice.domain.invoice.Invoice;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Locale;

import static rxinvoice.service.utils.ExcelExportUtils.*;

@Component
public class SalesExportService {

    private static final int DATE = 0;
    private static final int INVOICE_REFERENCE = 1;
    private static final int ACCOUNT = 2;
    private static final int LABEL = 3;
    private static final int DEBIT = 4;
    private static final int CREDIT = 5;

    private final Messages messages;
    private final SalesService salesService;

    public SalesExportService(Messages messages, SalesService salesService) {
        this.messages = messages;
        this.salesService = salesService;
    }

    public void exportSales(Iterable<Invoice> invoices, OutputStream outputStream) throws IOException {

        List<SaleLine> saleLines = this.salesService.buildSalesReport(invoices);

        XSSFWorkbook myWorkBook = new XSSFWorkbook();
        XSSFSheet mySheet = myWorkBook.createSheet();

        writeHeaderRow(myWorkBook, mySheet.createRow(0));

        int rowCounter = 1;

        for (SaleLine saleLine : saleLines) {
            XSSFRow row = mySheet.createRow(rowCounter);
            writeRow(myWorkBook, row, saleLine);
            rowCounter++;
        }
        myWorkBook.write(outputStream);
    }

    private void writeHeaderRow(Workbook wb, XSSFRow row) {
        createHeaderCell(wb, row, DATE, messages.getMessage("sale.line.date", Locale.FRENCH));
        createHeaderCell(wb, row, INVOICE_REFERENCE, messages.getMessage("sale.line.invoice.reference", Locale.FRENCH));
        createHeaderCell(wb, row, ACCOUNT, messages.getMessage("sale.line.account", Locale.FRENCH));
        createHeaderCell(wb, row, LABEL, messages.getMessage("sale.line.label", Locale.FRENCH));
        createHeaderCell(wb, row, CREDIT, messages.getMessage("sale.line.credit", Locale.FRENCH));
        createHeaderCell(wb, row, DEBIT, messages.getMessage("sale.line.debit", Locale.FRENCH));
    }

    private void writeRow(Workbook wb, XSSFRow row, SaleLine saleLine) {
        createCell(row, DATE, saleLine.getInvoiceDate());
        createCell(row, INVOICE_REFERENCE, saleLine.getReference());
        createCell(row, ACCOUNT, saleLine.getAccount());
        createCell(row, LABEL, saleLine.getLabel());
        createMoneyCell(wb, row, CREDIT, saleLine.getCredit());
        createMoneyCell(wb, row, DEBIT, saleLine.getDebit());
    }
}
