package rxinvoice.service.errors;

import restx.exceptions.ErrorCode;
import restx.exceptions.ErrorField;

public class CompanyErrors {

    @ErrorCode(code = "COMPANY ERROR - 001", description = "Existing company SIREN.")
    public enum CompanyExistingSirenError {
        @ErrorField("Company SIREN")
        SIREN,
        @ErrorField("Company name")
        NAME
    }
}
