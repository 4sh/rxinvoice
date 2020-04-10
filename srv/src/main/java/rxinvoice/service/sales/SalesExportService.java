package rxinvoice.service.sales;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
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
        CellStyle headerCellStyle = wb.createCellStyle();
        headerCellStyle.setAlignment(HorizontalAlignment.CENTER);
        Font font = wb.createFont();
        font.setBold(true);
        headerCellStyle.setFont(font);

        createCell(row, DATE, messages.getMessage("sale.line.date", Locale.FRENCH), headerCellStyle);
        createCell(row, INVOICE_REFERENCE, messages.getMessage("sale.line.invoice.reference", Locale.FRENCH), headerCellStyle);
        createCell(row, ACCOUNT, messages.getMessage("sale.line.account", Locale.FRENCH), headerCellStyle);
        createCell(row, LABEL, messages.getMessage("sale.line.label", Locale.FRENCH), headerCellStyle);
        createCell(row, CREDIT, messages.getMessage("sale.line.credit", Locale.FRENCH), headerCellStyle);
        createCell(row, DEBIT, messages.getMessage("sale.line.debit", Locale.FRENCH), headerCellStyle);
    }

    private void writeRow(Workbook wb, XSSFRow row, SaleLine saleLine) {
        CellStyle rightAlignCellStyle = wb.createCellStyle();
        rightAlignCellStyle.setAlignment(HorizontalAlignment.RIGHT);
        createCell(row, DATE, saleLine.getInvoiceDate(), rightAlignCellStyle);
        createCell(row, INVOICE_REFERENCE, saleLine.getReference(), rightAlignCellStyle);
        createCell(row, ACCOUNT, saleLine.getAccount(), StringUtils.isNumeric(saleLine.getAccount()) ? rightAlignCellStyle : null);
        createCell(row, LABEL, saleLine.getLabel());
        createMoneyCell(wb, row, CREDIT, saleLine.getCredit());
        createMoneyCell(wb, row, DEBIT, saleLine.getDebit());
    }
}
