var user_administrative = {
    name: "administratif",
    email: "service.administratif@4sh.fr",
    roles: ["seller"],
    companyRef: "53c535a5c8d11a14c7269436" ,
    companyRole: "ADMINISTRATIVE"
};

db.getCollection('users').save(user_administrative);
user_administrative._id = db.getCollection('users').findOne({email: user_administrative.email})._id;
db.getCollection('userCredentials').save({
    "_id": user_administrative._id,
    "passwordHash": "$2a$10$8EiasZHADtkNkF2C2yhfx./qY75KRa1iE.hABZxqQYQ4lbjUxUjxa"
});
