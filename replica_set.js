var mongoClient = require('mongodb').MongoClient;

var url = "mongodb://MBP-108-ON-01.local:27017,MBP-108-ON-01.local:27018,MBP-108-ON-01.local:27019/test_db";
mongoClient.connect(url, function(err, db) {
    db.collection("test_collection").find({ }).limit(1).next(function(err, doc){
        console.log(doc)
    });
});