/**
 * Created by bin.shen on 8/9/16.
 */

var amqp = require('amqplib/callback_api');
var moment = require('moment');

amqp.connect('amqp://121.40.92.176', function(err, conn) {

    conn.createChannel(function(err, ch) {

        var current = moment().format('YYYY-MM-DD HH:mm:ss');
        var level = Math.floor(Math.random() * 3 + 1);

        var ex = 'logs';
        var msg = '{"mac":"100001", "x1":"1", "x2":"2", "x3":"3", "x4":"4", "x5":"5", "created":"' + current + '", "company":"摩瑞尔电子", "level":' + level + '}';

        ch.assertExchange(ex, 'fanout', {durable: false});
        ch.publish(ex, '', new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});