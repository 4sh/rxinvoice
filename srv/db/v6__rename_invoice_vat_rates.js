var script = db.getCollection('scripts').findOne({_id: 'v6__rename_invoice_vat_rates.js'});

if (script) {
    print("This script was already launched at " + script.atDate);
} else {
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

    db.getCollection('scripts').save(
        {
            _id: "v6__rename_invoice_vat_rates.js",
            "atDate": ISODate()
        });
}
