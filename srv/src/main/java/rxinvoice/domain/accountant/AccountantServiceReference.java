package rxinvoice.domain.accountant;

import rxinvoice.domain.enumeration.ServiceKind;

public class AccountantServiceReference {

    private ServiceKind kind;
    private AccountantVATRate vatRate;
    private String accountNumber;

    @Override
    public String toString() {
        return "AccountantServiceReference{" +
                "kind=" + kind +
                ", vatRate=" + vatRate +
                ", accountNumber='" + accountNumber + '\'' +
                '}';
    }

    public ServiceKind getKind() {
        return kind;
    }

    public AccountantServiceReference setKind(ServiceKind kind) {
        this.kind = kind;
        return this;
    }

    public AccountantVATRate getVatRate() {
        return vatRate;
    }

    public AccountantServiceReference setVatRate(AccountantVATRate vatRate) {
        this.vatRate = vatRate;
        return this;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public AccountantServiceReference setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }
}
