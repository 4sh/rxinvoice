var quatreSHComp = db.getCollection('companies').findOne({name: "4SH"});
var accountantReferences =
    {
        "ACA Nexia": "CACA",
        "ACPPAV": "CACPPA",
        "AFD Technologies": "CAFD",
        "AGEFOS PME": "CAGEFO",
        "AlgoLinked": "CALGOLIN",
        "ALOGIA": "CALOGIA",
        "ARKHÉ INTERNATIONAL": "CARKHE",
        "ARRG": "CARRG",
        "ASTREE CONSULTANT": "CASTREE",
        "BeCLM": "CBECLM",
        "BP2R": "CBP2R",
        "BRAMBLES": "CCHEPUSA",
        "SCA BRUN": "CBRUN",
        "BRUN & JCD": "CBRUNJCD",
        "BVD Assurances": "CBVD",
        "CARGO INFORMATION NETWORK FRANCE": "CCARGOINFO",
        "CHEP USA": "CCHEPUSA",
        "CHIESI SAS": "CCHIESI",
        "COOLS Environnement et Développement": "CCOOLS",
        "DAM'S": "CDAM",
        "DIANA TRANS": "CDIANA",
        "Ets Ducasse Buzet SA": "CDUCASSE",
        "EASYstem": "CEASYS",
        "FAFIEC": "CFAFIEC",
        "FILHET ALLARD & Cie": "CFILHET",
        "FRAMATOME": "CFRAMATOM",
        "FRANCE CARGO HANDLING": "CFRANCE",
        "FSM": "CFSM",
        "Infoport": "CINFOPORT",
        "KeenTurtle": "CKEEN",
        "Logitrade France Siège": "CLOGITRADE",
        "MobySolve.4U": "CMOBY",
        "NAVITRANS": "CNAVITR",
        "NAXOS": "CNAXOS",
        "NIPPON EXPRESS": "CNIPPON",
        "OFEDO": "COFEDO",
        "OKINA": "COKINA",
        "OPCALIA REUNION": "COPCALIA",
        "ORANO PROJETS SAS": "CORANO",
        "450 SAS": "CQUATR",
        "SCA ROSELINE BRUN": "CROSELINE",
        "SANTEXCEL": "CSANTEX",
        "S.A.P.E.S.O.": "CSAPESO",
        "Société SEI": "CSEI",
        "SEMMARIS": "CSEMMARIS",
        "SIGMA Informatique": "CSIGMA",
        "SI-nerGIE": "CSINERGIE",
        "IZIVIA": "CSODETREL",
        "SUPERPLASTIC": "CSUPERPLASTIC",
        "TEKCAR": "CTECKCAR",
        "TechnichAtome": "CTECHNICH",
        "TN INTERNATIONAL": "CTNINTER",
        "UNIVERSITÉ PIERRE ET MARIE CURIE": "CUNIVERSITE",
        "URBISMART": "CURBIS",
        "Wilmar Sugar SA": "CWILMARSA",
        "XENASSUR": "CXENASSUR",
        "EUROPEAN SOURCING": "CEUROSOURCING",
        "Simatix": "CSIMATIX",
        "La Charente Libre": "CCHARLIBRE",
        "IN'COM": "CINCOM",
        "Pyrénnées Presse": "CPYRPRESSE",
        "GIE FILHET ALLARD": "CGIEFILHET"
    };

for (var key of Object.keys(accountantReferences)) {
    var company = db.getCollection('companies').findOne({name: key});
    if (!company) {
        print(key)
    } else {
        db.getCollection('commercialRelationships').update({
            customerRef: company._id + "",
            sellerRef: quatreSHComp._id + ""
        }, {$set: {accountantReference: accountantReferences[key]}});
    }
}
