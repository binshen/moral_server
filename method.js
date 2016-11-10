/**
 * Created by bin.shen on 6/4/16.
 */

var moment = require('moment');
var config = require('./config');

module.exports.toDec = function(hex) {
    if(typeof hex === 'number') {
        return parseInt(hex);
    }
    return Number('0x' + hex);
};

module.exports.toDecStr = function(hex) {
    return this.toDec(hex).toString();
};

module.exports.toDateStr = function(hex) {
    var digit = this.toDec(hex);
    if(digit < 10) {
        return '0' + digit.toString();
    }
    return digit.toString();
};

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

module.exports.calSum = function(fields) {
    var length = fields.length;
    var total = 0;
    for(var i in fields) {
        if(i == 0) continue;
        if(i == length - 2) break;
        total += fields[i];
    }
    return total.toString(16).substr(-2);
};

module.exports.insertDocument = function(db, data, callback) {
    var collection = db.collection(config.COLLECTION);
    collection.insertOne({ data: data, date: Date.now() }, function(err, result) {
        if (err) return;
        callback(result);
    });
};

module.exports.checkSum2 = function(fields) {
    var length = fields.length;
    var total = 0;
    var check_sum = '';
    for(var i in fields) {
        if(i == 0) continue;
        if(i < length - 2) {
            total += fields[i];
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

module.exports.getMac = function(data) {
    var fields = data.match(/.{2}/g);
    var mac = fields[6] + fields[7] + fields[8] + fields[9] + fields[10] + fields[11]; //Mac
    return mac.toLowerCase();
};

module.exports.getAppStatus = function(db, data, callback) {
    var mac = this.getMac(data);
    this.updateDeviceLastUpdated(db, mac, function(data) {});
    
    db.collection("devices").find({ mac: mac }).limit(1).next(function(err, doc){
        if (err) return;
        callback(doc);
    });
};

module.exports.registerDevice = function(db, data, callback) {
    var fields = data.match(/.{2}/g);
    var mac = fields[6] + fields[7] + fields[8] + fields[9] + fields[10] + fields[11]; //Mac
    mac = mac.toLowerCase();
    var ver1 = this.toDecStr(fields[16]) + '.' + this.toDecStr(fields[17]) + '.' + this.toDecStr(fields[18]) + '.' + this.toDecStr(fields[19]);
    var ver2 = '20' + this.toDateStr(fields[20]) + '-' + this.toDateStr(fields[21]) + '-' + this.toDateStr(fields[22]) + ' ' + this.toDateStr(fields[23]) + this.toDateStr(fields[24]) + this.toDateStr(fields[25]);
    var type = this.toDec(fields[15]) <= 80 ? 1 : 0;
    var collection = db.collection("devices");
    collection.find({ mac: mac }).limit(1).next(function(err, doc){
        if (err) return;
        if(doc == null) {
            collection.insertOne({ mac: mac, type: type, ver1: ver1, ver2: ver2, status: 1, last_updated: Date.now() }, function(err, result) {
                if (err) return;
                callback(result);
            });
        } else {
            collection.findOneAndUpdate({ mac: mac }, { $set: { type: type, ver1: ver1, ver2: ver2, status: 1, last_updated: Date.now() } }, {}, function(err, result) {
                if (err) return;
                callback(result);
            });
        }
    });
};


module.exports.insertData = function(db, data, callback) {
    var fields = data.match(/.{2}/g);

    var mac = fields[6] + fields[7] + fields[8] + fields[9] + fields[10] + fields[11]; //Mac
    mac = mac.toLowerCase();
    this.updateDeviceLastUpdated(db, mac, function(data) {});

    var x1  = this.toDec(fields[20]) * 256 + this.toDec(fields[21]); //PM2.5数据
    var x2  = this.toDec(fields[22]) * 256 + this.toDec(fields[23]); //PM10
    var x3  = this.toDec(fields[24]) * 256 + this.toDec(fields[25]); //0.1升0.3um量
    var x4  = this.toDec(fields[26]) * 256 + this.toDec(fields[27]); //0.1升2.5um量
    var x5  = fields[28]; //(甲醛）(首字)
    var x6  = fields[29]; //(甲醛）(ID)
    var x7  = fields[30]; //(甲醛）(数据单位)
    var x8  = this.toDec(fields[31]); //(甲醛）(当量)
    var x9  = this.toDec(fields[32]) * 256 + this.toDec(fields[33]); //甲醛
    if(x8 == 4) {
        x9 = x9 / 1000;
    } else if(x8 == 3) {
        x9 = x9 / 100;
    } else if(x8 == 2) {
        x9 = x9 / 10;
    }
    var x10 = this.toDec(fields[34]) * 256 + this.toDec(fields[35]); //湿度
    //var x11 = this.toDec(fields[36]) * 256 + this.toDec(fields[37]); //温度
    var x11 = this.toDec(fields[36]) == 0 ? this.toDec(fields[37]) : -1 * this.toDec(fields[37]);
    var x12 = this.toDec(fields[38]) * 256 + this.toDec(fields[39]); //风速
    var x13 = this.toDec(fields[40]) * 256 + this.toDec(fields[41]); //电池电量
    var x14 = this.toDec(fields[42]) * 256 + this.toDec(fields[43]); //光线强度

    var s = this.toDec(fields[44]);
    var p1 = this.toDec(fields[45]);
    var p2 = this.toDec(fields[46]);
    var p3 = this.toDec(fields[47]);
    var p4 = this.toDec(fields[48]);
    var fei = this.toDec(fields[58]);
    var ferval = this.toDec(fields[59]);
    var t = this.toDec(fields[56]);
    var aqi = this.toDec(fields[60]) * 256 + this.toDec(fields[61]); //AQI

    var ddv = this.toDec(fields[62]) * 256 + this.toDec(fields[63]);
    var mcu = this.toDec(fields[64]) + this.toDec(fields[65]) / 100;

    var current = moment();

    var rank = 0;
    if(s > 0) {
        rank = this.random(1000, 99999);//this.random(1000, 99999999);
        db.collection("device_ranks").insertOne({
            mac: mac,
            rank: rank,
            created: current.valueOf()
        }, function(err, result) { });
    }

    if(t > 0) {
        db.collection("device_tests").insertOne({
            mac: mac,
            test: t,
            created: current.valueOf()
        }, function(err, result) { });
    }

    db.collection("data").insertOne({
        mac: mac,
        x1: x1,
        x2: x2,
        x3: x3,
        x4: x4,
        x5: x5,
        x6: x6,
        x7: x7,
        x8: x8,
        x9: x9,
        x10: x10,
        x11: x11,
        x12: x12,
        x13: x13,
        x14: x14,
        p1: p1,
        p2: p2,
        p3: p3,
        p4: p4,
        fei: fei,
        ferval: ferval,
        aqi: aqi,
        s: s,
        rank: rank,
        ddv: ddv,
        mcu: mcu,
        day: current.format('YYYYMMDD'),
        created: current.valueOf()
    }, function(err, result) {
        if (err) return;
        callback(result, rank);
    });
};

module.exports.updateDeviceSleep = function(db, data, callback) {
    var mac = this.getMac(data);
    var collection = db.collection("devices");
    collection.findOneAndUpdate({ mac: mac }, { $set: { status: 0 } }, {}, function(err, doc) {
        if (err) return;
        callback(doc);
    });
};

module.exports.updateDeviceWakeup = function(db, data, callback) {
    var mac = this.getMac(data);
    var collection = db.collection("devices");
    collection.findOneAndUpdate({ mac: mac }, { $set: { status: 1 } }, {}, function(err, doc) {
        if (err) return;
        callback(doc);
    });
};

module.exports.updateDeviceLastUpdated = function(db, mac, callback) {
    var collection = db.collection("devices");
    collection.findOneAndUpdate({ mac: mac }, { $set: { status: 1, last_updated: Date.now() } }, {}, function(err, doc) {
        if (err) return;
        callback(doc);
    });
};


module.exports.getSort = function(db, data, callback) {
    var collection = db.collection("data");
    collection.aggregate([
        { $match: { created: { $gt: Date.now() - 60*1000 }, x3: { $lt: data } } },
        { $group: { _id: "$mac" } },
        { $group: { _id: null, total:{ $sum: 1 } } }
    ], function(err ,doc) {
        if (err) return;
        callback(doc[0]);
    });
};

module.exports.createSort = function(db, callback) {
    var _this = this;
    db.collection("devices").find({ last_updated: { $gt: Date.now() - 60*1000 } }).toArray(function(err, docs){
        if (err) return;
        docs.forEach(function(doc) {
            var mac = doc.mac;
            db.collection("data").find({ mac: mac }).sort({created: -1}).limit(1).next(function(err, doc){
                if (err) return;
                var data = doc["x3"];
                _this.getSort(db, data, function(doc) {
                    console.log(mac + ": " + data + " - " + doc['total'])
                });
            });
        });
    });
};

/////////////////////////////////////////////////

module.exports.random = function random(n,m){
    return Math.floor(Math.random() * (m - n + 1) + n);
};

module.exports.padLeft = function (str,lenght) {
    if(str.length >= lenght) {
        return str;
    } else {
        return this.padLeft("0"  + str, lenght);
    }
};

/////////////////////////////////////////////////
module.exports.insertDocument2 = function(db, data, rank, callback) {
    var fields = data.match(/.{2}/g);
    var mac = fields[6] + fields[7] + fields[8] + fields[9] + fields[10] + fields[11]; //Mac

    var x01 = this.toDec(fields[20]) * 256 + this.toDec(fields[21]); //PM2.5数据
    var x02 = this.toDec(fields[24]) * 256 + this.toDec(fields[25]); //PM2.5数据
    var x09 = this.toDec(fields[32]) * 256 + this.toDec(fields[33]); //甲醛
    var x10 = this.toDec(fields[34]) * 256 + this.toDec(fields[35]); //湿度
    var x11 = this.toDec(fields[36]) * 256 + this.toDec(fields[37]); //温度
    var x14 = this.toDec(fields[42]) * 256 + this.toDec(fields[43]); //光线强度

    var fei = this.toDec(fields[58]);
    var ferval = this.toDec(fields[59]);
    var aqi = this.toDec(fields[60]) * 256 + this.toDec(fields[61]);
    var ddv = this.toDec(fields[62]) * 256 + this.toDec(fields[63]);
    var mcu = this.toDec(fields[64]) + this.toDec(fields[65]) / 100;

    db.collection("devices").find({ mac: mac }).limit(1).next(function(err, doc){
        if (err) return;

        var app = 0;
        var app_status = doc.app_status;
        var app_last_updated = doc.app_last_updated;
        if(app_status == 1 && app_last_updated != null && Date.now() - app_last_updated <= 30000) {
            app = 1;
        }
        db.collection(config.COLLECTION).insertOne({ mac: mac.toLowerCase(), data: data + ' - PM2.5:' + x01 + ', 甲醛:' + x09 + ', 湿度:' + x10 + ', 温度:' + x11 + ', 个数:' + x02 + ', FEI:' +  ferval + ', 评级:' + fei + ', 光照:' + x14 + ', AQI:' + aqi + ', 电池电压:' + ddv + ', MCU温度:' + mcu + ', APP:' + app, date: Date.now() }, function(err, doc) {
            if (err) return;
            callback(doc);
        });
    });
};

