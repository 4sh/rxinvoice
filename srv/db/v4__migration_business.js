var script = db.getCollection('scripts').findOne({_id: 'v4__migration_business.js'});

if (script) {
    print("This script was already launched at " + script.atDate);
} else {

    db.getCollection('companies').find({name: "4SH"}).forEach(function (seller4sh) {

        seller4sh.customers = {};
        db.getCollection('companies').find().forEach(function (company) {
            seller4sh.customers[company.code] =
                {
                    businessList: company.business
                };
        });
        db.getCollection('companies').save(seller4sh);
    });
    db.getCollection('scripts').save(
        {
            _id: "v4__migration_business.js",
            "atDate": ISODate()
        });
}
