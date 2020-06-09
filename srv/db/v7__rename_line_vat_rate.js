db.getCollection('invoices').find({}).forEach(function (invoice) {
    invoice.lines.forEach(function (line) {
        if (line.vat) {
            line.vat.label = line.vat.vat;
            line.vat.rate = line.vat.amount;
            delete line.vat.vat;
            delete line.vat.amount;
            db.getCollection('invoices').save(invoice);
        }
    });
});

db.getCollection('invoices').find({}).forEach(function (invoice) {
    invoice.lines.forEach(function (line) {
        if (line.vat) {
            line.vatRate = line.vat;
            delete line.vat;
            db.getCollection('invoices').save(invoice);
        }
    });
});
