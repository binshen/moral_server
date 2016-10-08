/**
 * Created by bin.shen on 8/9/16.
 */

var amqp = require('amqplib/callback_api');
var moment = require('moment');

var uri = 'amqp://guest:guest@121.40.92.176'; //'amqp://121.40.92.176';
//var uri = 'amqp://localhost';

amqp.connect(uri, function(err, conn) {
    conn.createChannel(function(err, ch) {

        var current = moment().format('YYYY-MM-DD HH:mm:ss');
        var level = Math.floor(Math.random() * 3 + 1);

        var ex = 'ex_alarm';

        //var msg = '{"mac":"100001", "x1":"1", "x2":"2", "x3":"3", "x4":"4", "x5":"5", "created":"' + current + '", "company":"摩瑞尔电子", "level":' + level + '}';

        //var msg = '{"mac": "", "key":1, "lng": "116.395645", "lat": "39.929986", "created":"' + current + '", "lvl":' + level + '}';//北京
        var msg = '{"mac": "", "key":3, "lng": "118.103886", "lat": "24.489231", "created":"' + current + '", "lvl":' + level + '}';//厦门
        //var msg = '{"mac": "", "key":4, "lng": "91.750644", "lat": "29.229027", "created":"' + current + '", "lvl":' + level + '}';//西藏-山南地区
        //var msg = '{"mac": "", "key":2, "lng": "124.338543", "lat": "40.129023", "created":"' + current + '", "lvl":' + level + '}';//辽宁-丹东

        ch.assertExchange(ex, 'fanout', {durable: false});
        ch.publish(ex, '', new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});