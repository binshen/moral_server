/**
 * Created by bin.shen on 5/30/16.
 */

var net = require('net');

var HOST = '121.40.92.176';
var PORT = 6789;

var client = new net.Socket();

client.connect(PORT, HOST, function() {
    console.log('Connected');
    //client.write(new Buffer([ 0x5A, 0x00, 0x0A, 0x01, 0x00, 0x00 ]));
    client.write(new Buffer([ 0x5A, 0x00, 0x33, 0x01, 0x00, 0x01 ]));
});

client.on('data', function(data) {
    console.log('Received: ' + data.toString('hex'));
    client.destroy();
});

client.on('close', function() {
    console.log('Connection closed');
});