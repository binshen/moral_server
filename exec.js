/**
 * Created by bin.shen on 6/17/16.
 */

var exec = require('child_process').exec;

function exec_fun(command) {
	exec(command, function(err, stdout, stderr){
	    if(err) {
	        console.log('error:'+stderr);
	    } else {
	        //var data = JSON.parse(stdout);
	        console.log(stdout);
	    }
	});
}

exec_fun("php /home/bin.shen/superdog.php 111 222 333");
//exec_fun("php -r 'echo function_exists(\"dog_auth_verify_digest\");'");
//exec_fun("php -v");