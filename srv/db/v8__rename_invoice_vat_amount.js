db.getCollection('invoices').find({}).forEach(function (invoice) {
    invoice.vatsAmount.forEach(function (vatAmount) {
        vatAmount.label = vatAmount.vat;
        delete vatAmount.vat;
        db.getCollection('invoices').save(invoice);
    });
});
