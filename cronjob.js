/**
 * Created by bin.shen on 7/6/16.
 */

var moment = require('moment');
var mongoClient = require('mongodb').MongoClient;
var config = require('./config');
var method = require('./method');

mongoClient.connect(config.URL, function(err, db) {
    if (err) return;
    console.log('Connecting to Mongo DB at ' + config.URL);

    // method.getSort(db, 5064, function (doc) {
    //     if(doc != null) {
    //         console.log(doc['total']);
    //     }
    //     db.close();
    // });

    method.createSort(db, function(docs){
        console.log(docs)
        db.close();
    });
});