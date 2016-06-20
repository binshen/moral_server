/**
 * Created by bin.shen on 6/16/16.
 */

var net = require('net');
var mongoClient = require('mongodb').MongoClient;
var config = require('./config2');
var method = require('./method');

mongoClient.connect(config.URL, function(err, db) {
    if (err) return;
    console.log('Connecting to Mongo DB at ' + config.URL);

    net.createServer(function(socket) {
        console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);

        socket.on('data', function(data) {
            if(data == null) {
                console.log("Error - invalid data - null or undefined");
                return;
            }

            var value = data.toString('hex').toLowerCase();
            if(value.length < 12) {
                console.log("Error - invalid data - less than 12 character long");
                return;
            }

            //3.传感器数据上传
            if(value.startsWith('5a0034010003')) {
                method.insertDocument2(db, value, function(data) {});
                return;
            }

            //2.云地址写入WIFI模块
            if(value.startsWith('5a0033010002')) {
                method.insertDocument(db, value, function(data) {});
                socket.write(new Buffer(config.OUTPUT_2));
                return;
            }

            //6.配网数据
            if(value.startsWith('5a0033010006')) {
                socket.write(new Buffer(config.OUTPUT_6));
                return;
            }

            //12.联云通知
            if(value.startsWith('5a000a01000c')) {
                socket.write(new Buffer(config.OUTPUT_6));
                return;
            }
        });
        socket.on('close', function(data) {
            console.log('Closed socket: ' + socket.remoteAddress +' '+ socket.remotePort);
        });
    }).listen(config.PORT, config.HOST);

    console.log('TCP Server listening on ' + config.HOST +':'+ config.PORT);
});