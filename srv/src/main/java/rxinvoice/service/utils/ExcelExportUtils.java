package rxinvoice.service.utils;

import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;

public class ExcelExportUtils {


    public static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");


    public static void createCell(XSSFRow row, int cellIndex, String value) {
        createCell(row, cellIndex, value, null);
    }

    public static void createCell(XSSFRow row, int cellIndex, String value, CellStyle cellStyle) {
        if (value != null) {
            XSSFCell cell = row.createCell(cellIndex);
            cell.setCellValue(value);
            cell.setCellStyle(cellStyle);
        }
    }

    public static void createMoneyCell(Workbook wb, XSSFRow row, int cellIndex, BigDecimal value) {
        XSSFDataFormat cf = (XSSFDataFormat) wb.createDataFormat();
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setDataFormat(cf.getFormat("_-* # ##0.00 €_-;-* # ##0.00 €_-;_-@_-"));
        if (value != null) {
            XSSFCell cell = row.createCell(cellIndex);
            cell.setCellType(CellType.NUMERIC);
            cell.setCellValue(value.doubleValue());
            cell.setCellStyle(cellStyle);
        }
    }

    public static void createCell(XSSFRow row, int cellIndex, BigDecimal value, CellStyle cellStyle) {
        if (value != null) {
            XSSFCell cell = row.createCell(cellIndex);
            cell.setCellType(CellType.NUMERIC);
            cell.setCellValue(value.doubleValue());
            cell.setCellStyle(cellStyle);
        }
    }

    public static void createCell(XSSFRow row, int cellIndex, BigDecimal value) {
        createCell(row, cellIndex, value, null);
    }

    public static void createCell(XSSFRow row, int cellIndex, LocalDateTime value) {
        if (value != null) {
            row.createCell(cellIndex).setCellValue(SIMPLE_DATE_FORMAT.format(value.toDate()));
        }
    }

    public static void createCell(XSSFRow row, int cellIndex, DateTime value, CellStyle cellStyle) {
        if (value != null) {
            XSSFCell cell = row.createCell(cellIndex);
            cell.setCellValue(SIMPLE_DATE_FORMAT.format(value.toDate()));
            cell.setCellStyle(cellStyle);
        }
    }
    public static void createCell(XSSFRow row, int cellIndex, DateTime value) {
        createCell(row, cellIndex, value, null);
    }

}
