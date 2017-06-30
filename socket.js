var messages = require('./Model/messages');
var messagesDb = new messages();
var usernames = {};
module.exports = function(io, socket){

	console.log('start connection')
	var username="";
	  var uId="";
//	  var addUser=0;
//	  console.log(socket.id);
//	  socket.emit('test event', req.body.user_name )
	  socket.on('join room', function(user_name,uid){
		  username=user_name;
		  uId=uid;
//		  io.sockets.emit('logsUsers', username + ' is Online','green',username)
		  console.log('connected User :- '+username);
		  usernames[uid]=username;
//		  console.log(usernames);
//		  io.sockets.emit('logsUsers', 'Now '+ (Object.keys(usernames).length-1) +' users are Online','blue')
		  
		  socket.join(uId);
		  
		  io.sockets.emit('addUserList', usernames);//username:- for all user,,,socket.id :- for remove current user from this list
	  });  
	  socket.on('chat message', function(objMsg){
		  objMsg.from_user=uId;
		  console.log(objMsg);
//		  console.log(uId);
		  messagesDb.addNewMessage(objMsg,function(err,result){
			  if(err){
				  console.log(result);
				  throw result;
			  }
			  io.sockets.in(uId).emit('print message', {'msg':objMsg.msg,'to_user':objMsg.to_user,'from_user':uId,'print_sender_side':1});
			  io.sockets.in(objMsg.to_user).emit('print message', {'msg':objMsg.msg,'to_user':objMsg.to_user,'from_user':uId});
		  })
//		console.log(objMsg.to_user);
//		socket.broadcast.to(socket.id).emit('chat message1', msg);
	  });
	  
	  socket.on('send image', function(objMsg){
//		  console.log(objMsg)
		io.sockets.in(uId).emit('print message', {'image':objMsg.image,'to_user':objMsg.to_user,'from_user':uId,'print_sender_side':1});
		io.sockets.in(objMsg.to_user).emit('print message', {'image':objMsg.image,'to_user':objMsg.to_user,'from_user':uId});
//		socket.broadcast.to(socket.id).emit('chat message1', msg);
		  });
	  
	  socket.on('disconnect', function(){
		io.sockets.emit('logsUsers', username + ' is offline','red')
		
	    console.log(username +' user disconnected');
	    delete usernames[uId];
//	  io.sockets.emit('logsUsers', 'Now '+ (Object.keys(usernames).length-1) +' users are Online','blue',username)
	    io.sockets.emit('addUserList', usernames)
	  });
	
} 
