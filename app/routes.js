module.exports = function(app) {

	app.get('/', function(req, res){
        res.render('index');
    });

	app.get('/dashboard', function(req, res){
        res.render('dashboard');
    });


}