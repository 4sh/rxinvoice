package rxinvoice.domain.company;

import rxinvoice.domain.accountant.AccountantServiceReference;

import java.util.ArrayList;
import java.util.List;

public class SellerSettings {

    private final List<AccountantServiceReference> serviceReferenceList = new ArrayList<>();

    @Override
    public String toString() {
        return "AccountantConfiguration{" +
                "serviceReferenceList=" + serviceReferenceList +
                '}';
    }

    public List<AccountantServiceReference> getServiceReferenceList() {
        return serviceReferenceList;
    }
}
