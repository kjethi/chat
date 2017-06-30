"use strict";
var mongoose     = require('mongoose');
var mongoDb = require('./mongoDb');
var userModel = require('../../mongoSchema/userSchema');
var hash=require('../pass').hash;


class User{
	constructor(){
		var mongoConneObj=new mongoDb();
		 mongoConneObj.connectToMongoDbServer(function(err,db){
			 if(!err){
				 console.log('we\'re connected To MongoDb!')
			 }else{
				 console.log(data)				 
			 }
		  })
	}
	insert(userData,callback) {
		
		var saltText="";
		var hashText="";
		hash(userData.password, function(err, salt, hash){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			if (err) throw err;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
			// store the salt & hash in the "db"                              
			var createNewUser =new userModel({
				password   : hash.toString(),
				salt       : salt,
				firstName  : userData.firstName,
				lastName   : userData.lastName,
				email      : userData.email,
				address1   : userData.address1,
				phone1     : userData.phone_1,
				phone2     : userData.phone_2,
				isActive   : true,
				createAt   : new Date()
			});
			
			createNewUser.save(function (err, data) {
				callback(err, data)
			});
		});
	}
	  findByOptions(options,callback) {
		  
		  userModel.findOne(options, function(err, userData) {
			  if(err){
				  console.log(123)
				  callback(err)				  
			  }
			  else{
//				  console.log(userData)
				  callback(false,userData)
			  }
		  });
	}
	}

module.exports = User;

