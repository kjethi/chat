var userModel = require('../Model/mongoModel/User');
//var Router= require('router')();
var bodyParser =  require("body-parser");
var userForm= require('../form/userForm');
parse = require('url').parse;

module.exports = function(app) {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
//	Router.route('/signup')
//	.get(function(req, res){
//		res.render('login.ejs', { errors: false });
//	})
//	.post(function(req, res){
//		res.render('login.ejs', { errors: false });
//	});
	
	app.get('/signup', function(req, res){
		
		res.render('signup.ejs', { form: userForm.toHTML() });
	});
	app.post('/signup-post', function(req, res){
		userForm.handle(req, {
	        success: function (form) {
	        	
	        	var user=new userModel();
	        	
	        	user.insert(form.data,function(err,data){
	        		if(err){
	        			console.log(err);
	        		}else{
	        			res.send('success');
	        		}
	        	})
//	            var req_data = parse(req.url, 1).query;
//	            res.writeHead(200, { 'Content-Type': 'text/html' });
//	            res.write('<h1>Success!</h1>');
//	            res.write('<h2>' + util.inspect(req_data) + '</h2>');
	        },
	        other: function (form) {
//	        	console.log(form)
	            res.render('signup.ejs', { form: form.toHTML() });
	        }
	    });
		
		
		
	});
};
