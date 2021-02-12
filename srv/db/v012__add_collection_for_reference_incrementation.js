db.createCollection("counters");

db.getCollection("counters").insert({
    "name": "invoiceReference",
    "sequenceValue": NumberLong(1)
});