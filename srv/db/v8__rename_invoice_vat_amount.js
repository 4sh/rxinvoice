var script = db.getCollection('scripts').findOne({_id: 'v8__rename_invoice_vat_amount.js'});

if (script) {
    print("This script was already launched at " + script.atDate);
} else {
    db.getCollection('invoices').find({}).forEach(function (invoice) {
        invoice.vatsAmount.forEach(function (vatAmount) {
            vatAmount.label = vatAmount.vat;
            delete vatAmount.vat;
            db.getCollection('invoices').save(invoice);
        });
    });

    db.getCollection('scripts').save(
        {
            _id: "v8__rename_invoice_vat_amount.js",
            "atDate": ISODate()
        });
}
