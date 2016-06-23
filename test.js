// /**
//  * Created by bin.shen on 5/30/16.
//  */

var method = require('./method');
var config = require('./config');

//
// var str = "5a002f010001";
// var key1 = "5a002f010001a1b245";
// var key2 = "5a002f010101a1b245";
// console.log(key1.startsWith(str));
// console.log(key2.startsWith(str));
//
// var data = "a1B2c3";
// console.log(data.toString("hex").toLowerCase());
//
// function rand_string(n) {
//     if (n <= 0) {
//         return '';
//     }
//     var rs = '';
//     try {
//         rs = crypto.randomBytes(Math.ceil(n/2)).toString('hex').slice(0,n);
//         /* note: could do this non-blocking, but still might fail */
//     }
//     catch(ex) {
//         /* known exception cause: depletion of entropy info for randomBytes */
//         console.error('Exception generating random string: ' + ex);
//         /* weaker random fallback */
//         rs = '';
//         var r = n % 8, q = (n-r)/8, i;
//         for(i = 0; i < q; i++) {
//             rs += Math.random().toString(16).slice(2);
//         }
//         if(r > 0){
//             rs += Math.random().toString(16).slice(2,i);
//         }
//     }
//     return rs;
// }
//
// console.log(rand_string(64))

// require('crypto').randomBytes(32, function(err, buffer) {
//     var hex = buffer.toString('hex');
//     console.log(hex.length)
//     console.log(hex)
// });console.log(hex)

// var crypto = require('crypto');
// var hex = crypto.randomBytes(32).toString('hex');
// console.log(hex.length);
// console.log(hex);

//faae3e645e9cb3cfbb91f9e46eabefeacf42799af82218ec886c4bf04f9fef29

// var crypto = require('crypto');
// var cipher = crypto.createCipher('aes-256-cbc','faae3e645e9cb3cfbb91f9e46eabefeacf42799af82218ec886c4bf04f9fef29')
// var text = "5a000a010002f00f0c5b";
// var crypted = cipher.update(text,'utf8','hex');
// crypted += cipher.final('hex');
// console.log(crypted);
//
// var decipher = crypto.createDecipher('aes-256-cbc','faae3e645e9cb3cfbb91f9e46eabefeacf42799af82218ec886c4bf04f9fef29')
// var dec = decipher.update(crypted,'hex','utf8');
// dec += decipher.final('utf8');
// console.log(dec);

// var mongoClient = require('mongodb').MongoClient;
// var URL = 'mongodb://121.40.92.176:27017/moral_db';
// var COLLECTION = 'data';
//
// mongoClient.connect(URL, function(err, db) {
//     if (err) return;
//     console.log('Connecting to Mongo DB at ' + URL);
//
//     insertDocument(db, {'aaa':'2222'}, function(data) {
//         console.log('++++++++')
//     });
// });
//
// var insertDocument = function(db, data, callback) {
//     var collection = db.collection(COLLECTION);
//     collection.insertOne({ data: data, date: Date.now() }, function(err, result) {
//         if (err) return;
//         callback(result);
//     });
// };

// data = "5a003301000300000000000000000000000000000000000000000000000000000000006c01d60000c90000140000000000575b";
// var fields = data.match(/.{2}/g);
// var items = {};
// for(var i in fields) {
//     items[i] = fields[i];
// }
//
// console.log(items);
// console.log(items[50]);

// var config = require('./config');
// console.log(config.HOST);

// var a = 234;
// console.log(a.toString(16));
//
// var b = 0xea;
// console.log(b.toString());

// var method = require('./method');
// var data = '5a003301000300000000000000000000000000000000000000000000000000000000006c01d60000c90000140000000000575b'
// console.log(method.checkSum(data));

// var method = require('./method');
// var a = 'ea';
// console.log(method.toDec(a));


// var mongoClient = require('mongodb').MongoClient;
// var URL = 'mongodb://121.40.92.176:27017/moral_db';
//
// mongoClient.connect(URL, function(err, db) {
//     if (err) return;
//     console.log('Connecting to Mongo DB at ' + URL);
//
//     var mac = "1q2w3e4r5t6y"
//     var collection = db.collection("devices");
//     collection.find({mac: mac}).limit(1).next(function(err, doc){
//         if(doc == null) {
//             collection.insertOne({ mac: mac }, function(err, result) {
//                 if (err) return;
//                 //callback(result);
//             });
//         }
//     });
// });

// // http://momentjs.com/docs/
// var moment = require('moment');
// var now = moment();
// console.log(now.format('YY'));
// console.log(now.format('M'));
// console.log(now.format('D'));
// console.log(now.format('e'));
// console.log(now.format('H'));
// console.log(now.format('m'));
// console.log(now.format('s'));
//
// console.log(parseInt("10", 16));
// console.log(16..toString(16));
// console.log(Number('0x' + "ff"));
// console.log(0x10);
//
// var hex = [ 0x6A, 0x00, 0x0A, 0x01, 0x00, 0x0C, 0xF2, 0x2F, 0x38, 0x6B ];
// var dec = [ 106, 0, 10, 1, 0, 12, 242, 47, 56, 107 ];
// console.log(new Buffer(hex));
// console.log(new Buffer(dec));
//
// var output = config.OUTPUT_4;
// console.log(output);
// console.log(new Buffer(output));
// output[6] = parseInt(now.format('s'));
// output[7] = parseInt(now.format('m'));
// output[8] = parseInt(now.format('H'));
// output[9] = parseInt(now.format('D'));
// output[10] = parseInt(now.format('M'));
// output[11] = parseInt(now.format('e'));
// output[12] = parseInt(now.format('YY'));
// output[13] = method.toDec(method.calSum(output));
// console.log(output);
// console.log(new Buffer(output));
//
// console.log(new Buffer(config.OUTPUT_1));
// console.log(method.calSum(config.OUTPUT_1));

// var mongoClient = require('mongodb').MongoClient;
// var URL = 'mongodb://121.40.92.176:27017/moral_db';
// var COLLECTION = 'data';
//
// mongoClient.connect(URL, function(err, db) {
//     if (err) return;
//     console.log('Connecting to Mongo DB at ' + URL);
//
//     method.updateDeviceLastUpdated(db, "5a0010010004accf23b87fa2a44a035b", function(doc) { })
// });

//console.log("5a0010010007accf23b87fa2".startsWith("5a0010010007"));

// console.log(new Date());
// var moment = require('moment');
// console.log(moment().format("YYYY-MM-DD HH:mm:ss"))

// var moment = require('moment')
// console.log(moment().format('YYYYMMDD'));
// console.log(moment().valueOf());
// console.log(Date.now());

var mongoClient = require('mongodb').MongoClient;
var URL = 'mongodb://121.40.92.176:27017/moral_db';

mongoClient.connect(URL, function(err, db) {
    if (err) return;
    console.log('Connecting to Mongo DB at ' + URL);

    var data = "5a0010010001accf23b87fbf";
    method.getAppStatus(db, data, function(user) {
        console.log(user)
    })
});
