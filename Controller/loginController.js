var session = require('express-session');

var userModel = require('../Model/mongoModel/User');
//var Router= require('router')();
var bodyParser =  require("body-parser");
var userForm= require('../form/userForm');
parse = require('url').parse;
var hash=require('../Model/pass').hash;


module.exports = function(app) {
	app.use(session({secret: 'ssshhhhh'}));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	var user=new userModel();
	app.post('/login', function(req, res){
		loginCheck(req,function(obj){
			if(obj.status){
//				console.log('success');
				sess=req.session;
				sess.userDetail=obj.userData;
				res.writeHead(302, {'Location': req.protocol + '://' + req.get('host') +'/chat' });
				res.end();
			}else{
				res.render('login.ejs', { error: true,error_message: obj.msg });
			}
			
		});
		
	});
	app.get('/login', function(req, res){
		sess = req.session;
		if(!sess.userDetail){
			res.render('login.ejs', { error: false });
		}
		else{
			res.writeHead(302, {'Location': req.protocol + '://' + req.get('host') +'/chat' });
			res.end();
		};
	});
	app.get('/logout', function(req, res){
		sess = req.session;
		if(sess.userDetail){
			req.session.destroy();
		}
			res.writeHead(302, {'Location': req.protocol + '://' + req.get('host') +'/login' });
			res.end();
	});
	function loginCheck(req,callback){
		var msg="qwe";
		var status=false;
		
		user.findByOptions({'email': req.body.email},function(err,data){
			if(err){
				throw err;
			}else{
				if(data){
					hash(req.body.password,data.salt,function(err,hashPwd){
	    				if(err)throw err;
	    				//console.log(hashPwd.toString())
	    				//console.log(data.password)
	    				if(data.password==hashPwd.toString()){
//	    					console.log(2);
	    					status=true;
	    					callback({'status':status,'msg':'success','userData':data})
	    				}else{
	    					msg="Password is wrong12";
	    					//console.log(msg)
//	    					console.log(3);
	    					status=false;
	    					callback({'status':status,'msg':'pwd is wrong'});
	    				}
	    			});				
				}else{
					status=false;
					msg="user Name is wrong ";
//					console.log(4)
					callback({'status':status,'msg':'user Name is wrong'});
				}
				
			}
		});
	}
};
