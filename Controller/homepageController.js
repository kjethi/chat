module.exports = function(app) {
	
app.get('/', function(req, res){
		
		
		sess = req.session;
		console.log()
		if(!sess.username){
			res.writeHead(302, {'Location': req.protocol + '://' + req.get('host') +'/login' });
		}
		else{
			res.writeHead(302, {'Location': req.protocol + '://' + req.get('host') +'/chat' });
		};
		res.end();
		
	});
};
