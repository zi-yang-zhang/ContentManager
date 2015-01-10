module.exports = function(app,passport,db) {
	var api = require('./api.js')(db);
	app.get('/', function(req, res){
        res.render('index');
    });

	app.get('/partial/:name', function (req, res) {
        var name = req.params.name;
        res.render('partial/' + name);
    });

	app.get('/dashboard', function(req, res){
        res.render('dashboard');
    });

	app.post('/api/login', passport.authenticate('local-login', {
        session: true
    }),api.login);
}