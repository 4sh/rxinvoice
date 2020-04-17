package rxinvoice.domain.company;

import rxinvoice.domain.accountant.AccountantServiceReference;
import rxinvoice.domain.accountant.AccountantVATRate;
import rxinvoice.domain.enumeration.ServiceKind;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class SellerSettings {

    private final List<AccountantVATRate> vatRates = new ArrayList<>();
    private final List<AccountantServiceReference> serviceReferenceList = new ArrayList<>();

    @Override
    public String toString() {
        return "SellerSettings{" +
                "vatRates=" + vatRates +
                ", serviceReferenceList=" + serviceReferenceList +
                '}';
    }

    public List<AccountantVATRate> getVatRates() {
        return vatRates;
    }

    public List<AccountantServiceReference> getServiceReferenceList() {
        return serviceReferenceList;
    }

    public Optional<AccountantVATRate> findVATRate(BigDecimal rate) {
        return this.vatRates.stream().filter(vatRate -> rate.equals(vatRate.getRate())).findFirst();
    }

    public Optional<AccountantServiceReference> findServiceReference(ServiceKind serviceKind, BigDecimal vatRate) {
        return serviceReferenceList.stream()
                .filter(accountantServiceReference -> serviceKind.equals(accountantServiceReference.getKind()) &&
                        ((vatRate == null && accountantServiceReference.getVatRate() == null) ||
                                (vatRate != null &&
                                        accountantServiceReference.getVatRate() != null &&
                                        vatRate.equals(accountantServiceReference.getVatRate().getRate()))))
                .findFirst();
    }
}
