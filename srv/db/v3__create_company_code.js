var script = db.getCollection('scripts').findOne({_id: 'v3__create_company_code.js'});

if (script) {
    print("This script was already launched at " + script.atDate);
} else {

    db.getCollection('companies').find().forEach(function (company) {
        company.code = company.name.replace(/[\s]/g, '').replace(/[\.]/g, '');
        db.getCollection('companies').save(company);
    });
    db.getCollection('scripts').save(
        {
            _id: "v3__create_company_code.js",
            "atDate": ISODate()
        });
}
