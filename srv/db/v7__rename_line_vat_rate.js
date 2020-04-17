var script = db.getCollection('scripts').findOne({_id: 'v7__rename_line_vat_rate.js'});

if (script) {
    print("This script was already launched at " + script.atDate);
} else {
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

    db.getCollection('scripts').save(
        {
            _id: "v7__rename_line_vat_rate.js",
            "atDate": ISODate()
        });
}
