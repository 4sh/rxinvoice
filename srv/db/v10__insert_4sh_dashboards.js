db.getCollection('dashboardConfigurations').insert([
    {
        "companyRef": "53c535a5c8d11a14c7269436",
        "title": "Dashboard administratif",
        "role": "ADMINISTRATIVE",
        "columnConfigurations": [
            {
                "actionRequired": false,
                "disabled": false,
                "title": "dashboard.column.to.prepare",
                "invoiceStatus": "READY"
            },
            {
                "actionRequired": true,
                "disabled": false,
                "title": "dashboard.column.validation.waiting",
                "invoiceStatus": "WAITING_VALIDATION"
            },
            {
                "actionRequired": false,
                "disabled": false,
                "title": "dashboard.column.to.send",
                "invoiceStatus": "VALIDATED"
            },
            {
                "actionRequired": false,
                "disabled": false,
                "title": "dashboard.column.payment.waiting",
                "invoiceStatus": "SENT"
            },
            {
                "actionRequired": false,
                "disabled": false,
                "title": "dashboard.column.late",
                "invoiceStatus": "LATE"
            }
        ]
    },
    {
        "companyRef": "53c535a5c8d11a14c7269436",
        "title": "Dashboard pilotes projet",
        "role": "INVOICING",
        "columnConfigurations": [
            {
                "actionRequired": false,
                "disabled": false,
                "title": "dashboard.column.draft",
                "invoiceStatus": "DRAFT"
            },
            {
                "actionRequired": false,
                "disabled": true,
                "title": "dashboard.column.preparation.waiting",
                "invoiceStatus": "READY"
            },
            {
                "actionRequired": false,
                "disabled": false,
                "title": "dashboard.column.to.validate",
                "invoiceStatus": "WAITING_VALIDATION"
            }
        ]
    }
]);
