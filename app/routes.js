module.exports = function(app) {

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


}