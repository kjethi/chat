var session = require('express-session');
//var Router= require('router')();
var bodyParser =  require("body-parser");
var userForm= require('../form/userForm');
parse = require('url').parse;

module.exports = function(app) {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	app.all('/chat', function(req, res){
		
		sess = req.session;
		if(sess.userDetail){
//			console.log(sess.userDetail);
//			var chatObj=new chat();
//			chatObj.socketConnection();
			res.render('chat.ejs',{userDetail:sess.userDetail});
			res.end();
			}
		else{
			res.writeHead(302, {'Location': req.protocol + '://' + req.get('host') +'/login' });
			res.end();
		}
		
	});
	
};
