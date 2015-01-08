// config/passport.js
				
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
 
// expose this function to our app using module.exports
module.exports = function(passport, db) {
 
	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
 
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });
 
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		db.query("select * from users where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
    });
	
 
 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
 
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with username
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
 
		// find a user whose username is the same as the forms username
		// we are checking to see if the user trying to login already exists
        db.query("select * from users where username = '"+username+"'",function(err,rows){
			console.log(rows);
			console.log("above row object");
			if (err)
                return done(err);
			 if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
 
				// if there is no user with that username
                // create the user
                var newUser = new Object();
				
				newUser.username    = username;
                newUser.password = password; // use the generateHash function in our user model
			
				var insertQuery = "INSERT INTO users ( username, password ) values ('" + username +"','"+ password +"')";
				console.log(insertQuery);
				db.query(insertQuery,function(err,rows){
				newUser.id = rows.insertId;
				
				return done(null, newUser);
				});	
            }	
		});
    }));
 
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
 
    passport.use('local-login', new LocalStrategy(
    function(username, password, done) { // callback with username and password from our form
 
         db.query("SELECT * FROM `users` WHERE `username` = '" + username + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, { message: 'Incorrect username.' });
            } 
			
			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false, { message: 'Incorrect password.' });
			
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
		
 
 
    }));
 
};