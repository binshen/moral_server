/**
 * Created by bin.shen on 5/30/16.
 */

var net = require('net');


var mongoClient = require('mongodb').MongoClient;

var HOST = '121.40.92.176';
var PORT = 6789;
var URL = 'mongodb://127.0.0.1:27017/moral_db';
var COLLECTION = 'documents';


var insertDocument = function(db, data, callback) {
    var collection = db.collection(COLLECTION);
    /*
     var length = data.length;
     if(length != 64) return;
     var fields = data.match(/.{2}/g);
     var items = {};
     for(var i in fields) {
     items['f' + (parseInt(i) + 1)] = fields[i];
     }
     collection.insertMany([ items ], function(err, result) {
     if (err) return;
     callback(result);
     });
     */
    collection.insertMany([ { data: data, date: Date.now() } ], function(err, result) {
        if (err) return;
        callback(result);
    });
};

mongoClient.connect(URL, function(err, db) {
    if (err) return;
    console.log('Connecting to Mongo DB at ' + URL);

    net.createServer(function(sock) {
        console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
        sock.on('data', function(data) {
            var value = data.toString('hex');
            insertDocument(db, value, function(result) {
                //sock.write(JSON.stringify(result));
            });

            if(value === '5a000a010002f00f0c5b') {
                sock.write(new Buffer([ 0x6A, 0x00, 0x0A, 0x01, 0x00, 0x2, 0xF0, 0x0F, 0x0C, 0x6B ]));
            } else if(value === '5a000a010004f22f305b') {
                sock.write(new Buffer([ 0x6A, 0x00, 0x0A, 0x01, 0x00, 0x04, 0xF2, 0x2F, 0x30, 0x6B ]));
            } else {
                //sock.write("1\n");
            }
            /*
             if(value === '5a000a010004f22f305b') {
             sock.write(new Buffer([ 0x6A, 0x00, 0x0A, 0x01, 0x00, 0x04, 0xF2, 0x2F, 0x30, 0x6B ]));
             }
             */
        });

        sock.on('close', function(data) {
            console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        });
    }).listen(PORT, HOST);
    console.log('TCP Server listening on ' + HOST +':'+ PORT);
});