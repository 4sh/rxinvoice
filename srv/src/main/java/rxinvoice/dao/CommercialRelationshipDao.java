package rxinvoice.dao;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import rxinvoice.domain.Metrics;
import rxinvoice.domain.company.CommercialRelationship;
import rxinvoice.domain.invoice.InvoiceInfo;

import javax.inject.Named;
import java.time.Instant;
import java.util.Optional;

import static rxinvoice.utils.MoreJ8Preconditions.checkPresent;

@Component
public class CommercialRelationshipDao {

    private static final Logger logger = LoggerFactory.getLogger(CommercialRelationshipDao.class);

    private final JongoCollection commercialRelationships;

    public CommercialRelationshipDao(@Named("commercialRelationships") JongoCollection commercialRelationships) {
        this.commercialRelationships = commercialRelationships;
    }

    public CommercialRelationship create(CommercialRelationship commercialRelationship) {
        logger.debug("Create commercial relationship: {}", commercialRelationship);
        this.commercialRelationships.get().save(commercialRelationship);
        return commercialRelationship;
    }

    public Iterable<CommercialRelationship> findBySellerRef(String sellerRef) {
        return this.commercialRelationships.get()
                .find("{sellerRef: #}", sellerRef).as(CommercialRelationship.class);
    }


    public CommercialRelationship findBySellerRefAndCustomerRef(String sellerRef, String customerRef) {
        Optional<CommercialRelationship> commercialRelationshipOptional = Optional.ofNullable(this.commercialRelationships.get()
                .findOne("{sellerRef: #, customerRef: #}", sellerRef, customerRef)
                .as(CommercialRelationship.class));

        return checkPresent(commercialRelationshipOptional,
                String.format("Commercial relationship not found for seller: %s and customer %s", sellerRef, customerRef));
    }

    public void updateCompanyGlobalMetrics(String sellerRef, String customerRef, Metrics metrics) {
        logger.debug("Update commercial relationship between seller {} and customer {} to set global metrics: {}",
                sellerRef, customerRef, metrics);
        updateCompanyMetrics(sellerRef, customerRef, metrics, "global");
    }

    public void updateCompanyPreviousYearMetrics(String sellerRef, String customerRef, Metrics metrics) {
        logger.debug("Update commercial relationship between seller {} and customer {} to set previous year metrics : {}",
                sellerRef, customerRef, metrics);
        updateCompanyMetrics(sellerRef, customerRef, metrics, "previousYear");
    }

    public void updateCompanyCurrentYearMetrics(String sellerRef, String customerRef, Metrics metrics) {
        logger.debug("Update commercial relationship between seller {} and customer {} to set current year metrics : {}",
                sellerRef, customerRef, metrics);
        updateCompanyMetrics(sellerRef, customerRef, metrics, "currentYear");
    }

    public void updateCompanyNextYearMetrics(String sellerRef, String customerRef, Metrics metrics) {
        logger.debug("Update commercial relationship between seller {} and customer {} to set next year metrics : {}",
                sellerRef, customerRef, metrics);
        updateCompanyMetrics(sellerRef, customerRef, metrics, "nextYear");
    }

    private void updateCompanyMetrics(String sellerRef, String customerRef, Metrics metrics, String property) {
        this.commercialRelationships.get()
                .update("{sellerRef: #, customerRef: #}", sellerRef, customerRef)
                .with("{$set: {companyMetrics." + property + ": #}}", metrics);

    }

    public void updateLastInvoiceSend(String sellerRef,
                                         String customerRef,
                                         Instant lastSendDate,
                                         InvoiceInfo lastSentInvoice) {
        logger.debug("Update last invoice movements seller {} and customer {} to set last invoice payment date {} and last payment info {}",
                sellerRef, customerRef, lastSendDate, lastSentInvoice);

        this.commercialRelationships.get()
                .update("{sellerRef: #, customerRef: #}", sellerRef, customerRef)
                .with("{$set: {" +
                        "lastSentDate: #," +
                        "lastSentInvoice: #}}", lastSendDate, lastSentInvoice);
    }

    public void updateLastInvoicePayment(String sellerRef,
                                         String customerRef,
                                         Instant lastPaymentDate,
                                         InvoiceInfo lastPaidInvoice) {
        logger.debug("Update last invoice movements seller {} and customer {} to set last invoice payment date {} and last payment info {}",
                sellerRef, customerRef, lastPaymentDate, lastPaidInvoice);

        this.commercialRelationships.get()
                .update("{sellerRef: #, customerRef: #}", sellerRef, customerRef)
                .with("{$set: {" +
                        "lastPaymentDate: #," +
                        "lastPaidInvoice: #}}", lastPaymentDate, lastPaidInvoice);
    }
}
