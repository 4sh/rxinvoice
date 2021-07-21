var user4pm = db.getCollection('users').findOne(ObjectId("53c53624c8d11a14c7269438"));

delete user4pm.password;
delete user4pm.login;
user4pm.name = "4pm";

db.getCollection('users').save(user4pm);

db.getCollection('userCredentials').save({
    "_id": user4pm._id,
    "passwordHash": "$2a$10$8EiasZHADtkNkF2C2yhfx./qY75KRa1iE.hABZxqQYQ4lbjUxUjxa"
});
// Password hash computed with bcrypt(098f6bcd4621d373cade4e832627b4f6)


var user4sh = db.getCollection('users').findOne(ObjectId("53c66756c8d11a14c7269439"));

delete user4sh.password;
delete user4sh.login;

user4sh.name = '4sh';

db.getCollection('users').save(user4sh);

db.getCollection('userCredentials').save({
    "_id": user4sh._id,
    "passwordHash": "$2a$10$8EiasZHADtkNkF2C2yhfx./qY75KRa1iE.hABZxqQYQ4lbjUxUjxa"
});
// Password hash computed with md5+bcrypt(<realPassword>)

// Remove user print
db.getCollection('users').remove(ObjectId("54f6fed80940029aa34ec005"));
