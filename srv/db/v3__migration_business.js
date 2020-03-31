var script = db.getCollection('scripts').findOne({_id: 'v3__migration_business.js'});

if (script) {
    print("This script was already launched at " + script.atDate);
} else {

    var shSeller = db.getCollection('companies').findOne({name: "4SH"});

    var companyMetrics = db.getCollection('sellerCompanyMetrics').findOne({"sellerRef": shSeller._id + ""});

    db.getCollection('companies').find().forEach(function (company) {

        var commercialRelationship = {
            sellerRef: shSeller._id + "",
            customerRef: company._id+ "",

            detail: company.detail,
            legalNotice: company.legalNotice,
            showLegalNoticeForeignBuyer: company.showLegalNoticeForeignBuyer,

            lastSendDate: company.lastSendDate,
            lastPaymentDate: company.lastPaymentDate,
            lastSentInvoice: company.lastSentInvoice,
            lastPaidInvoice: company.lastPaidInvoice,
            companyMetrics: {
                global: company.metrics,
                previousYear: companyMetrics.buyerCompaniesMetrics[company._id+""].previousYear,
                currentYear: companyMetrics.buyerCompaniesMetrics[company._id+""].currentYear,
                nextYear: companyMetrics.buyerCompaniesMetrics[company._id+""].nextYear
            },
            businessList: company.business,
            vatRates:[]
        };

        company.vats.forEach(function(vat) {
            commercialRelationship.vatRates.push(
               {
                   rate: vat.amount,
                   label: vat.vat
               }
           );
        });
        db.getCollection('commercialRelationships').save(commercialRelationship);

    });
    db.getCollection('scripts').save(
        {
            _id: "v3__migration_business.js",
            "atDate": ISODate()
        });
}
