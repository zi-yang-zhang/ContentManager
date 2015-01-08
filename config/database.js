module.exports = function(mysql) {

	var connection = mysql.createConnection({
					  host     : 'localhost',
					  user     : 'root',
					  password : '12345',
					  database : 'app'
					});

	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }

	  console.log('connected as id ' + connection.threadId);
	});

	connection.on('close', function(err) {
	  if (err) {
	    // Oops! Unexpected closing of connection, lets reconnect back.
	    connection = mysql.createConnection(connection.config);
	  } else {
	    console.log('Connection closed normally.');
	  }
	});

	process.on('SIGINT', function() {
		connection.end(function(err) {
  			// The connection is terminated now
  			if(err){
  				console.error('error exiting: ' + err.stack);
  				process.exit(0);
  			}else{
  				console.log('Mysql default connection disconnected through app termination');
            	process.exit(0);
  			}
		});
    });

    return connection;

}