/**
 * Created by bin.shen on 5/30/16.
 */

var net = require('net');


var mongoClient = require('mongodb').MongoClient;

var HOST = '121.40.92.176';
var PORT = 6789;
var URL = 'mongodb://127.0.0.1:27017/moral_db';
var COLLECTION = 'documents';

mongoClient.connect(URL, function(err, db) {
    if (err) return;
    console.log('Connecting to Mongo DB at ' + URL);

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
                sock.write(new Buffer([ 0x6A, 0x00, 0x51, 0x01, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xA2, 0x2A, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x00, 0x04, 0x07, 0x10, 0x03, 0x17, 0x10, 0x10, 0x00, 0x01, 0x01, 0x1A, 0x85, 0x79, 0x28, 0x5C, 0xB0, 0x00, 0x05, 0x5C, 0xB0, 0x00, 0x05, 0x5C, 0xB0, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xF3, 0x6B ]));
                return;
            }

            //6.配网数据
            if(value.startsWith('5a0033010006')) {
                sock.write(new Buffer([ 0x6A, 0x00, 0x0A, 0x01, 0x00, 0x0C, 0xF2, 0x2F, 0x38, 0x6B ]));
                return;
            }

            //12.联云通知
            if(value.startsWith('5a000a01000c')) {
                sock.write(new Buffer([ 0x6A, 0x00, 0x0A, 0x01, 0x00, 0x0C, 0xF2, 0x2F, 0x38, 0x6B ]));
                return;
            }
        });
        sock.on('close', function(data) {
            console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        });
    }).listen(PORT, HOST);
    console.log('TCP Server listening on ' + HOST +':'+ PORT);
});

var insertDocument = function(db, data, callback) {
    var collection = db.collection(COLLECTION);
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