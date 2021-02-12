package rxinvoice.dao;

import org.bson.types.ObjectId;
import org.jongo.Find;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import rxinvoice.domain.Blob;
import rxinvoice.domain.Counter;
import rxinvoice.domain.invoice.Invoice;

import javax.inject.Named;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static rxinvoice.domain.invoice.Status.LATE;
import static rxinvoice.domain.invoice.Status.SENT;

@Component
public class InvoiceDao {

    private static final Logger logger = LoggerFactory.getLogger(InvoiceDao.class);

    private final JongoCollection invoices;
    private final JongoCollection counters;

    public InvoiceDao(@Named("invoices") JongoCollection invoices,
                      @Named("counters") JongoCollection counters) {
        this.invoices = invoices;
        this.counters = counters;
    }

    public void create(Invoice invoice) {
        logger.debug("Create invoice {}", invoice);
        this.invoices.get().save(invoice);
    }

    public void update(Invoice invoice) {
        logger.debug("Update invoice {}", invoice);
        this.invoices.get().save(invoice);
    }

    public void updateSendDate(Invoice invoice, Date sendDate) {
        logger.debug("Update invoice ({}) send date to {}", invoice.getKey(), sendDate);
        this.invoices.get()
                .update(new ObjectId(invoice.getKey()))
                .with("{$set: {sentDate: #}}", sendDate);
    }

    public void updateAmounts(Invoice invoice) {
        logger.debug("Update invoice ({}) vat amounts to {}, gross amount to {} and net amount to {}",
                invoice.getKey(),
                invoice.getVatsAmount(),
                invoice.getGrossAmount(),
                invoice.getNetAmount());
        this.invoices.get()
                .update(new ObjectId(invoice.getKey()))
                .with("{$set: {" +
                                "vatsAmounts: #, " +
                                "netAmount: #, " +
                                "grossAmount: #}" +
                                "}",
                        invoice.getVatsAmount(),
                        invoice.getNetAmount(),
                        invoice.getGrossAmount());
    }

    public int updateLateInvoices(Date date) {
        logger.debug("Update late invoices (status SENT and dueDate < {}", date);
        return this.invoices.get()
                .update("{status: #, dueDate: {$lt: #}}", SENT, date)
                .multi()
                .with("{$set: {status: #}}", LATE).getN();

    }

    public void delete(String invoiceId) {
        logger.debug("Delete invoice with id: {}", invoiceId);
        this.invoices.get().remove(new ObjectId(invoiceId));
    }

    public void updateAttachments(String invoiceId, List<Blob> blobs) {
        logger.debug("Update attachment for invoice id: {}", invoiceId);
        this.invoices.get().update(new ObjectId(invoiceId))
                .with("{$push: {attachments: {$each: #}}}", blobs);
    }

    public void deleteAttachment(String invoiceId, String attachmentId) {
        logger.debug("Delete attachment ({}) for invoice id: {}", attachmentId, invoiceId);
        this.invoices.get().update(new ObjectId(invoiceId))
                .with("{$pull: {attachments: {_id: #}}}", new ObjectId(attachmentId));
    }

    public Iterable<Invoice> findAll() {
        return this.invoices.get().find().as(Invoice.class);
    }

    public Optional<Invoice> findByKey(String key) {
        logger.debug("Find invoice by key: {}", key);
        return Optional.ofNullable(this.invoices.get().findOne(new ObjectId(key)).as(Invoice.class));
    }

    public Optional<Invoice> findByReference(String reference) {
        logger.debug("Find invoice by reference: {}", reference);
        return Optional.ofNullable(invoices.get().findOne("{reference : #}", reference).as(Invoice.class));
    }

    public Iterable<Invoice> findInvoicesByBuyer(String buyerId) {
        logger.debug("Find invoices by buyer id: {}", buyerId);
        return this.invoices.get().find("{ buyer._id: #}", new ObjectId(buyerId)).as(Invoice.class);
    }

    public Iterable<Invoice> find(String query, Optional<String> sortCriteriaOptional) {
        logger.debug("Find invoices with query: {}", query);
        Find find = this.invoices.get().find(query);
        if (sortCriteriaOptional.isPresent()) {
            find = find.sort(sortCriteriaOptional.get());
        }
        return find.as(Invoice.class);
    }

    public String findNextReference() {
        logger.debug("Find next invoice reference and increment it");
        Counter as = this.counters.get()
                .findAndModify("{name: \"invoiceReference\" }")
                .with("{ $inc: { sequence_value: 1 } }")
                .returnNew()
                .as(Counter.class);
        return as.getSequenceValue().toString();
    }

}
