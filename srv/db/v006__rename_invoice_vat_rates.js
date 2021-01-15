db.getCollection('invoices').update({}, {$rename: {"vats": "vatRates"}}, {multi: true});

db.getCollection('invoices').find({}).forEach(function (invoice) {
    invoice.vatRates.forEach(function (vatRate) {
        vatRate.label = vatRate.vat;
        vatRate.rate = vatRate.amount;
        delete vatRate.vat;
        delete vatRate.amount;
        db.getCollection('invoices').save(invoice);
    });
});
