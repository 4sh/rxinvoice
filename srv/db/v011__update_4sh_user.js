db.getCollection('users').update(
    {name: "4sh"},
    {$set: {companyRole: "DIRECTOR"}}
    );
