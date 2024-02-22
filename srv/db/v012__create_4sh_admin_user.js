var admin_user = {
    name: "4sh_admin",
    email: "4sh_admin@4sh.fr",
    roles: ["seller"],
    companyRef: "53c535a5c8d11a14c7269436",
    companyRole: "DIRECTOR"
};

db.getCollection('users').insertOne(admin_user);

admin_user._id = db.getCollection('users').findOne({email: admin_user.email})._id;
db.getCollection('userCredentials').insertOne({
    "_id": admin_user._id,
    "passwordHash": "$2a$10$8EiasZHADtkNkF2C2yhfx./qY75KRa1iE.hABZxqQYQ4lbjUxUjxa"
});
