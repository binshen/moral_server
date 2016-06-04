/**
 * Created by bin.shen on 5/30/16.
 */

var net = require('net');
var mongoClient = require('mongodb').MongoClient;
var config = require('./config');

mongoClient.connect(config.URL, function(err, db) {
    if (err) return;
    console.log('Connecting to Mongo DB at ' + config.URL);

    net.createServer(function(sock) {
        console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

        sock.on('data', function(data) {
            if(data == null) {
                console.log("error - invalid data - null or undefined");
                return;
            }

            var value = data.toString('hex').toLowerCase();
            if(value.length < 12) {
                console.log("error - invalid data - less than 12 character long");
                return;
            }

            //3.传感器数据上传
            if(value.startsWith('5a0033010003')) {
                insertDocument(db, value, function(data) {
                    //TODO
                });
                return;
            }

            //2.云地址写入WIFI模块
            if(value.startsWith('5a0033010002')) {
                sock.write(new Buffer(config.OUTPUT_2));
                return;
            }

            //6.配网数据
            if(value.startsWith('5a0033010006')) {
                sock.write(new Buffer(config.OUTPUT_6));
                return;
            }

            //12.联云通知
            if(value.startsWith('5a000a01000c')) {
                sock.write(new Buffer(config.OUTPUT_6));
                return;
            }
        });
        sock.on('close', function(data) {
            console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        });
    }).listen(config.PORT, config.HOST);
    
    console.log('TCP Server listening on ' + config.HOST +':'+ config.PORT);
});

var insertDocument = function(db, data, callback) {
    var collection = db.collection(config.COLLECTION);
    collection.insertOne({ data: data, date: Date.now() }, function(err, result) {
        if (err) return;
        callback(result);
    });
};

var insertData = function(db, data, callback) {
    var collection = db.collection("data");
    collection.insertOne({ data: data, date: Date.now() }, function(err, result) {
        if (err) return;
        callback(result);
    });
};