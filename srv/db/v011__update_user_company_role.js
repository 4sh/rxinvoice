db.getCollection('users').update(
    {name: "4sh"},
    {$set: {companyRole: "DIRECTOR"}}
);
db.getCollection('users').update(
    {name: "4pm"},
    {$set: {companyRole: "DIRECTOR"}}
);
db.getCollection('users').update(
    {name: "administratif"},
    {$set: {companyRole: "DIRECTOR"}}
);
