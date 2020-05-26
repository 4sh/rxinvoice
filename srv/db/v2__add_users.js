var user_AGA = {
    name: "AGA",
    email: "amandine.guerra@4sh.fr",
    roles: ["seller"],
};
var user_CRT = {
    name: "CRT",
    email: "camille.renault@4sh.fr",
    roles: ["seller"]
};

db.getCollection('users').save(user_AGA);
user_AGA._id = db.getCollection('users').findOne({email: user_AGA.email})._id;
db.getCollection('userCredentials').save({
    "_id": user_AGA._id,
    "passwordHash": "$2a$10$8EiasZHADtkNkF2C2yhfx./qY75KRa1iE.hABZxqQYQ4lbjUxUjxa"
});
db.getCollection('users').save(user_CRT);
user_CRT._id = db.getCollection('users').findOne({email: user_CRT.email})._id;
db.getCollection('userCredentials').save({
    "_id": user_CRT._id,
    "passwordHash": "$2a$10$8EiasZHADtkNkF2C2yhfx./qY75KRa1iE.hABZxqQYQ4lbjUxUjxa"
});