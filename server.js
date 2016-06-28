/**
 * Created by bin.shen on 5/30/16.
 */

var net = require('net');
var moment = require('moment');
var mongoClient = require('mongodb').MongoClient;
var config = require('./config');
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

            //1.心跳命令行
            if(value.startsWith('5a0010010001')) {
                var output = [ 0x6A, 0x00, 0x0A, 0x01, 0x00, 0x01, 0xA1, 0x1A, 0xC7, 0x6B ];
                method.getAppStatus(db, value, function(doc) {
                    var app_status = doc.app_status;
                    var app_last_updated = doc.app_last_updated;
                    if(app_status == 1 && app_last_updated != null && Date.now() - app_last_updated <= 60000) {
                        output[7] = 0x1B;
                    }
                    socket.write(new Buffer(output));
                });
                return;
            }

            //3.传感器数据上传
            if(value.startsWith('5a0033010003')) {
                var mac = method.getMac(value);
                if(mac == 'accf23b87fa2') {
                    console.log("2-" + moment().format("YYYY-MM-DD HH:mm:ss") + ": " + value);
                }
                method.insertDocument2(db, value, function(data) {});
                method.insertData(db, value, function(data) {});
                method.updateDeviceLastUpdated(db, value, function(data) {});
                return;
            }

            //7.主机休眠前发送即将休眠的命令
            if(value.startsWith('5a0010010007')) {
                method.updateDeviceSleep(db, value, function(data) {});
                return;
            }

            //4.云端时间
            if(value.startsWith('5a0010010004')) {
                method.updateDeviceWakeup(db, value, function(data) {});
                var current_time = moment();
                var output = [
                    0x6A, 0x00, 0x0e, 0x01, 0x00, 0x04,  //包头(0-5)
                    parseInt(current_time.format('s')),  //秒
                    parseInt(current_time.format('m')),  //分
                    parseInt(current_time.format('H')),  //小时
                    parseInt(current_time.format('D')),  //日
                    parseInt(current_time.format('M')),  //月
                    parseInt(current_time.format('E')),  //星期
                    parseInt(current_time.format('YY')), //年
                    0x36, //校验和
                    0x6B  //包尾
                ];
                socket.write(new Buffer(output));
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
                method.registerDevice(db, value, function(data) {});
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
            console.log('Closed socket: ' + socket.remoteAddress + ' ' + socket.remotePort);
        });
    }).listen(config.PORT, config.HOST);
    
    console.log('TCP Server listening on ' + config.HOST + ':' + config.PORT);
});
