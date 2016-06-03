// /**
//  * Created by bin.shen on 5/30/16.
//  */
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

var crypto = require('crypto');
var cipher = crypto.createCipher('aes-256-cbc','faae3e645e9cb3cfbb91f9e46eabefeacf42799af82218ec886c4bf04f9fef29')
var text = "5a000a010002f00f0c5b";
var crypted = cipher.update(text,'utf8','hex');
crypted += cipher.final('hex');
console.log(crypted);

var decipher = crypto.createDecipher('aes-256-cbc','faae3e645e9cb3cfbb91f9e46eabefeacf42799af82218ec886c4bf04f9fef29')
var dec = decipher.update(crypted,'hex','utf8');
dec += decipher.final('utf8');
console.log(dec);