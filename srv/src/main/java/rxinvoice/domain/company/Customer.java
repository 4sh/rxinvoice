package rxinvoice.domain.company;

import java.util.ArrayList;
import java.util.List;

/**
 * Customer is a relation between 2 companies. It contains customer specific data for a given sender.
 */
public class Customer {

    private final List<VATRate> vatRates = new ArrayList<>();
    private final List<Business> businessList = new ArrayList<>();

    @Override
    public String toString() {
        return "Customer{" +
                ", vatRates=" + vatRates +
                ", businessList=" + businessList +
                '}';
    }

    public List<VATRate> getVatRates() {
        return vatRates;
    }

    public List<Business> getBusinessList() {
        return businessList;
    }
}
