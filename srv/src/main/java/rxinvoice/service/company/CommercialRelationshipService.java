package rxinvoice.service.company;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import rxinvoice.AppModule;
import rxinvoice.dao.CommercialRelationshipDao;
import rxinvoice.domain.company.CommercialRelationship;
import rxinvoice.domain.company.Company;

@Component
public class CommercialRelationshipService {

    private static final Logger logger = LoggerFactory.getLogger(CommercialRelationshipService.class);

    private final CommercialRelationshipDao commercialRelationshipDao;

    public CommercialRelationshipService(CommercialRelationshipDao commercialRelationshipDao) {
        this.commercialRelationshipDao = commercialRelationshipDao;
    }

    public CommercialRelationship create(Company customer) {
        logger.info("Create new commercial company relationship between seller {} and customer {}",
                AppModule.currentUser().getCompanyRef(), customer.getName());
        String sellerRef = AppModule.currentUser().getCompanyRef();
        CommercialRelationship commercialRelationship = new CommercialRelationship()
                .setSellerRef(sellerRef)
                .setCustomerRef(customer.getKey());
        return this.commercialRelationshipDao.create(commercialRelationship);
    }

    public CommercialRelationship update(CommercialRelationship commercialRelationship) {
        logger.info("Update company relationship between seller {} and customer {}",
                AppModule.currentUser().getCompanyRef(), commercialRelationship.getCustomerRef());
        this.commercialRelationshipDao.updateGeneralData(commercialRelationship.getSellerRef(),
                commercialRelationship.getCustomerRef(),
                commercialRelationship.getBusinessList(),
                commercialRelationship.getVatRates(),
                commercialRelationship.getLegalNotice(),
                commercialRelationship.getDetail(),
                commercialRelationship.getAccountantReference(),
                commercialRelationship.getCustomerManagerRef());
        return commercialRelationship;
    }

    public CommercialRelationship updateLastInvoiceSend(CommercialRelationship commercialRelationship) {
        logger.info("Update commercial relationship company relationship between seller {} and customer {}",
                commercialRelationship.getSellerRef(), commercialRelationship.getCustomerRef());
        this.commercialRelationshipDao.updateLastInvoiceSend(commercialRelationship.getSellerRef(),
                commercialRelationship.getCustomerRef(),
                commercialRelationship.getLastSendDate(),
                commercialRelationship.getLastSentInvoice());
        return commercialRelationship;
    }

    public CommercialRelationship updateLastInvoicePayment(CommercialRelationship commercialRelationship) {
        logger.info("Update commercial relationship company relationship between seller {} and customer {} for the last invoice payment",
                commercialRelationship.getSellerRef(), commercialRelationship.getCustomerRef());
        this.commercialRelationshipDao.updateLastInvoicePayment(commercialRelationship.getSellerRef(),
                commercialRelationship.getCustomerRef(),
                commercialRelationship.getLastPaymentDate(),
                commercialRelationship.getLastPaidInvoice());
        return commercialRelationship;
    }

    public Iterable<CommercialRelationship> findAll() {
        String sellerRef = AppModule.currentUser().getCompanyRef();
        return this.commercialRelationshipDao.findBySellerRef(sellerRef);
    }

    public CommercialRelationship findByCustomer(String customerRef) {
        String sellerRef = AppModule.currentUser().getCompanyRef();
        return this.commercialRelationshipDao.findBySellerRefAndCustomerRef(sellerRef, customerRef);
    }

}
