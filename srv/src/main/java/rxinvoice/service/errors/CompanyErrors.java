package rxinvoice.service.errors;

import restx.exceptions.ErrorCode;
import restx.exceptions.ErrorField;

public class CompanyErrors {

    @ErrorCode(code = "COMPANY ERROR - 001", description = "Exiting company code.")
    public enum CompanyExitingCodeError {
        @ErrorField("Company code")
        CODE,
        @ErrorField("Company name")
        NAME
    }
}
