/**
 * Created by bin.shen on 6/4/16.
 */

var config = require('./config');

module.exports.checkSum = function(data) {
    var fields = data.match(/.{2}/g);
    var length = fields.length;
    var total = 0;
    var check_sum = '';
    for(var i in fields) {
        if(i == 0) continue;
        if(i < length - 2) {
            total += Number('0x' + fields[i]);
        } else if(i == length - 2) {
            check_sum = fields[i];
        }
    }
    if(total.toString(16).substr(-2) == check_sum) {
        return true;
    } else {
        return false;
    }
};

module.exports.insertDocument = function(db, data, callback) {
    var collection = db.collection(config.COLLECTION);
    collection.insertOne({ data: data, date: Date.now() }, function(err, result) {
        if (err) return;
        callback(result);
    });
};

module.exports.insertData = function(db, data, callback) {
    var collection = db.collection("data");
    collection.insertOne({ data: data, date: Date.now() }, function(err, result) {
        if (err) return;
        callback(result);
    });
};