var socket=""; 
var __USERNAMEARR__='';
$(function () {
	socket=io();

	socket.on('connect', function(){
		  socket.emit('join room', __USERNAME__,__USERID__);
	  	});
	    socket.on('print message', function(msgObj){
	    	var msgHtml='';
	    	if(msgObj.hasOwnProperty('print_sender_side')){
	    		if(msgObj.image !== undefined){
	    			msgHtml= '<div class="bubble me"><img  width="100" height="100" src="'+msgObj.image+'"/></div>';	
	    		}else{
	    			msgHtml= '<div class="bubble me">'+msgObj.msg+'</div>';
	    		}
	    		
	    		$('#js_chat_'+msgObj.to_user).append(msgHtml);
	    	}else{
	    		if(msgObj.image !== undefined){
	    			msgHtml= '<div class="bubble you"><img width="100" height="100" src="'+msgObj.image+'"/></div>';
	    		}else{
	    			msgHtml= '<div class="bubble you">'+msgObj.msg+'</div>';
	    		}
	    		if($('#js_chat_'+msgObj.from_user).length>0){
	    			$('#js_chat_'+msgObj.from_user).append(msgHtml);
	    			
	    			if(!$('#js_chat_'+msgObj.from_user).hasClass('active-chat')){
	    				var msgObject=$('#userList [data-chat="'+msgObj.from_user+'"]').find('.new-msg-alert');
	    				var msgCount=parseInt(msgObject.html())+1
	    				msgObject.html(msgCount)
	    				msgObject.removeClass('hide')
	    			}
	    		}
	    		}
	      });
	    
	    socket.on('addUserList', function(usernames){
	    	$('#userList').html('');
//	    	$('.js_header_title').html('Online Users('+ (Object.keys(usernames).length-1) +')');
	    	var userHtml='';
	    	__USERNAMEARR__=usernames
	    	if(Object.keys(usernames).length>1){
	    		$.each(usernames, function(key, value) {
		    		if(__USERID__!=key){
		    			userHtml=userHtml+'<li class="person js_selectUserForSendMsg" data-chat="'+ key +'"  data-user="'+value+'">'
		    			+'<span class="new-msg-alert hide">0</span>'
	                    +'<img src="http://s13.postimg.org/ih41k9tqr/img1.jpg" alt="" />'
	                    +'<span class="name">'+value+'</span>'
	                    +'<span class="time">2:09 PM</span>'
	                    +'<span class="preview">Status.....</span>'
	                    +'</li>';
		    			if($('.chat[data-chat="'+ key +'"]').length==0){
		    				var chatHtml='<div id="js_chat_'+key+'" class="chat" data-chat="'+ key +'"></div>';
			    			$('.js_chat_box').append(chatHtml)	    				
		    			}
		    			
		    		}
		    	})
	    	}else{
	    		userHtml='<li style="text-align:center">No user Online</li>'
	    	}
	    	
	    	$('#userList').append(userHtml);
	    });
//	    socket.on('logsUsers', function(msg,ColorClass,username){
//	    	$('.chat-box-footer .input-group').append('<p class="'+ColorClass+'">'+ msg +'</p>');
//	    	$('js_chat_'+username+' .js_chat_messages').append('<div class="'+ColorClass+'">'+msg+'</div>')
//	      });
	    
	    $(document).on('click','.js_selectUserForSendMsg',function(){
	    	$('.new-msg-alert').addClass('hide')
	    	$('.new-msg-alert').html('0')
	    	var toUserId=$(this).data('chat');
	    	$('.js_send_msg_btn').data('to-user',toUserId);
	    	if($('#js_chat_'+__USERNAMEARR__[toUserId]).length>0){
	    		$('#js_chat_'+__USERNAMEARR__[toUserId]).show();
	    	}
	    });
	    $(document).on('click','.js_close_chat_box',function(){
	    	$(this).parents('.js_chat_box').hide()
	    	
	    });
	    $(document).on('keypress','.js_send_msg_text',function(e){
	    	 if (e.keyCode == 13) {
	    		 $(this).parent().find('.js_send_msg_btn').click();
	    	    }
	    });
	    $('.js-clear-logs').click(function(){
	    	$('.chat-box-footer .input-group').html('');
	    });
	    
	    $('.js_send_msg_btn').click(function(){
	    	if($('.js_send_msg_text').val()!=''){
	    		socket.emit('chat message', {'msg':$('.js_send_msg_text').val(),'to_user':$(this).data('to-user')});
				 $('.js_send_msg_text').val('');
					return false;
	    	}	
				});	
	    
	    $('.js_send_msg_image').change(function(e){
	    	alert('hi')
	    	console.log($(this)[0].files);
	    	
	    	if ($(this)[0].files) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	            	socket.emit('send image', {'image': e.target.result,'to_user':$('.js_send_msg_btn').data('to-user')});
					 $('.js_send_msg_text').val('');
						return false;
		    	}	

	            reader.readAsDataURL($(this)[0].files[0]);
	        }
	    	
	    	
//	    	if($('.js_send_msg_text').val()!=''){
//	    		socket.emit('chat message', {'msg':$('.js_send_msg_text').val(),'to_user':$(this).data('to-user')});
//				 $('.js_send_msg_text').val('');
//					return false;
//	    	}	
				});	
	    
	  });
window.onbeforeunload = function () {
	  // This will happen before leaving the page
	  return prompt('Are you sure you want to leave?');
	} 

