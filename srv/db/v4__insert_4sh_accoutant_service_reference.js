var script = db.getCollection('scripts').findOne({_id: 'v4__insert_4sh_accountant_service_reference.js'});

if (script) {
    print("This script was already launched at " + script.atDate);
} else {

    var quatreSHComp = db.getCollection('companies').findOne({name: "4SH"});

    if (quatreSHComp) {
        quatreSHComp.sellerSettings = {
            serviceReferenceList: [
                {
                    kind: "SERVICE",
                    accountNumber: "706100",
                    vatRate: {
                        rate: 850,
                        accountNumber: "445712"
                    }
                },
                {
                    kind: "SERVICE",
                    accountNumber: "706110",
                    vatRate: {
                        rate: 2000,
                        accountNumber: "445711"
                    }
                },
                {
                    kind: "SERVICE",
                    accountNumber: "706950"
                },
                {
                    kind: "SERVICE",
                    accountNumber: "706951"
                },
                {
                    kind: "FEE",
                    accountNumber: "708950",
                    // NO TVA
                },
                {
                    kind: "FEE",
                    accountNumber: "708100",
                    vatRate: {
                        rate: 2000,
                        accountNumber: "445711"
                    }

                },
                {
                    kind: "FEE",
                    accountNumber: "708000",
                    vatRate: {
                        rate: 850,
                        accountNumber: "445712"
                    }
                },
                {
                    kind: "TRAINING",
                    accountNumber: "706111",
                    vatRate: {
                        rate: 2000,
                        accountNumber: "445711"
                    }
                },
                {
                    kind: "TRAINING",
                    accountNumber: "706112",
                    vatRate: {
                        rate: 850,
                        accountNumber: "445712"
                    }
                },
                {
                    kind: "HOSTING",
                    accountNumber: "706114",
                    vatRate: {
                        rate: 2000,
                        accountNumber: "445711"
                    },
                },
                {
                    kind: "SUBCONTRACTING",
                    accountNumber: "706113",
                    vatRate: {
                        rate: 2000,
                        accountNumber: "445711"
                    },
                },
                {
                    kind: "BUY_SELL",
                    accountNumber: "707000",
                    vatRate: {
                        rate: 2000,
                        accountNumber: "445711"
                    },
                },
                {
                    kind: "BUY_SELL",
                    accountNumber: "707100",
                    vatRate: {
                        rate: 850,
                        accountNumber: "445712"
                    },
                },
            ]
        };
        db.getCollection('companies').save(quatreSHComp);
    }
    db.getCollection('scripts').save(
        {
            _id: "v4__insert_4sh_accountant_service_reference.js",
            "atDate": ISODate()
        });
}
