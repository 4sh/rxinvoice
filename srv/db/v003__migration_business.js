var shSeller = db.getCollection('companies').findOne({name: "4SH"});

var companyMetrics = db.getCollection('sellerCompanyMetrics').findOne({"sellerRef": shSeller._id + ""});

db.getCollection('companies').find().forEach(function (company) {

    var commercialRelationship = {
        sellerRef: shSeller._id + "",
        customerRef: company._id + "",

        detail: company.detail,
        legalNotice: shSeller.legalNotice,
        showLegalNoticeForeignBuyer: company.showLegalNoticeForeignBuyer,

        lastSendDate: company.lastSendDate,
        lastPaymentDate: company.lastPaymentDate,
        lastSentInvoice: company.lastSentInvoice,
        lastPaidInvoice: company.lastPaidInvoice,
        companyMetrics: {
            global: company.metrics,
            previousYear: companyMetrics.buyerCompaniesMetrics[company._id + ""]? companyMetrics.buyerCompaniesMetrics[company._id + ""].previousYear: null,
            currentYear: companyMetrics.buyerCompaniesMetrics[company._id + ""]?companyMetrics.buyerCompaniesMetrics[company._id + ""].currentYear:null,
            nextYear: companyMetrics.buyerCompaniesMetrics[company._id + ""]?companyMetrics.buyerCompaniesMetrics[company._id + ""].nextYear:null
        },
        businessList: company.business,
        vatRates: []
    };

    if (company.vats && company.vats.length > 0) {
        company.vats.forEach(function (vat) {
            commercialRelationship.vatRates.push(
                {
                    rate: vat.amount,
                    label: vat.vat
                }
            );
        });
    } else {
        var normalVAT = {
            rate: 2000,
            label: "Taux normal"
        };

        var minoredVAT = {
            rate: 850,
            label: "Taux réduit"
        };

        var outsideUnionVAT = {
            rate: 0,
            label: "Taux Hors UE"
        };
        if (company.name === "Infoport") {
            commercialRelationship.vatRates.push(minoredVAT);
        } else if (company.name === "CHEP") {
            commercialRelationship.vatRates.push(outsideUnionVAT);
        } else {
            commercialRelationship.vatRates.push(normalVAT);
        }
    }
    db.getCollection('commercialRelationships').save(commercialRelationship);
});

db.getCollection('companies').update({}, {
    $unset: {
        business: "",
        vats: "",
        metrics: "",
        lastSendDate: "",
        lastPaymentDate: "",
        lastSentInvoice: "",
        lastPaidInvoice: "",
        detail: "",
        legalNotice: "",
        showLegalNoticeForeignBuyer: ""

    }
}, {multi: true});
