var quatreSHComp = db.getCollection('companies').findOne({name: "4SH"});

if (quatreSHComp) {
    quatreSHComp.sellerSettings = {
        vatRates : [
            {
                "label" : "Taux normal",
                "rate" : 2000,
                "accountNumber" : "445711"
            },
            {
                "label" : "Taux réduit",
                "rate" : 850,
                "accountNumber" : "445712"
            },
            {
                "label" : "Taux Hors UE",
                "rate" : 0,
                "accountNumber" : "0"
            }
        ],
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
                accountNumber: "706951",
                vatRate: {
                    rate: 0,
                    accountNumber: "0"
                }
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
