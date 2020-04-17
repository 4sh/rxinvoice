package rxinvoice.domain.accountant;

import rxinvoice.domain.company.VATRate;

public class AccountantVATRate extends VATRate {

    /**
     * VAT account number used to aggregate VAT amounts into specific accounts for VAT declaration.
     */
    private String accountNumber;

    @Override
    public String toString() {
        return "AccountantVATRate{" +
                "accountNumber='" + accountNumber + '\'' +
                "} " + super.toString();
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public AccountantVATRate setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

}
