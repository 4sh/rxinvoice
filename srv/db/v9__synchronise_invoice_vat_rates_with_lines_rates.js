function extractLinesVatRates(lines) {
    var vatRates = [];
    lines.forEach(function (line) {
        if (line.vatRate && line.vatRate.rate) {
            vatRates.push(line.vatRate);
        }
    });
    return vatRates;
}

db.getCollection('invoices').find({vatRates: {$size: 0}}).forEach(function (invoice) {
    var vatRates = extractLinesVatRates(invoice.lines);
    if (vatRates.length > 0) {
        invoice.vatRates = vatRates;
        db.getCollection('invoices').save(invoice);
    }
});