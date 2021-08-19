package rxinvoice.domain.print;

import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;

public class PrintUtils {

    public static final NumberFormat NUMBER_FORMAT;

    static {
        NUMBER_FORMAT = DecimalFormat.getCurrencyInstance(Locale.FRANCE);
        NUMBER_FORMAT.setMinimumFractionDigits(2);
        NUMBER_FORMAT.setCurrency(Currency.getInstance("EUR"));
    }

    public static final DateTimeFormatter DATE_TIME_FORMATTER =  DateTimeFormat.forPattern("dd/MM/yy");
}
