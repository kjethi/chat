var express = require('express');
var app = express();
var bodyParser =  require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');
var expressValidator = require('express-validator');
var redb = require('./rtDb');
var dbConfig = require('./config/DbConfig');


//######For CSS,JS path#######
app.use(express.static(__dirname + '/Resources/public'));


app.use(session({secret: 'ssshhhhh'}));

//######For View Template path#######
app.set('views', __dirname + '/Resources/views');
app.set('view engine', 'ejs');
var sess;


//app.get('/', function(req, res){
//  res.sendFile(__dirname + '/login.html');
//});

// Setup ReThink Db
var dbModel=new redb();
dbModel.setupDb(dbConfig.reThinkDb);
//Setup ReThink Db

http.listen(2828, function(){
  console.log('listening on *:2828');
});

require('./Controller/userController')(app); 
require('./Controller/loginController')(app); 
require('./Controller/chatController')(app); 
//require('./Controller/userController')(app); 
//
io.on('connection', function(socket){
	console.log('start connection')
	  
	  require('./socket')(io,socket)
	  //krunal-developer
	  
	});	


