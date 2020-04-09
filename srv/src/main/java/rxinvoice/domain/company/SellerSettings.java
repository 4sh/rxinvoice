package rxinvoice.domain.company;

import rxinvoice.domain.accountant.AccountantServiceReference;
import rxinvoice.domain.enumeration.ServiceKind;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public Optional<AccountantServiceReference> findServiceReference(ServiceKind serviceKind, BigDecimal vatRate) {
        return serviceReferenceList.stream()
                .filter(accountantServiceReference -> serviceKind.equals(accountantServiceReference.getKind())
                        && ((vatRate == null && accountantServiceReference.getVatRate() == null)
                        || (vatRate != null && vatRate.equals(accountantServiceReference.getVatRate().getRate()))))
                .findFirst();
    }
}
