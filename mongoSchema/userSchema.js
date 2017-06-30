var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	
	password : String,
	salt     : String,
	firstName : String,
	lastName : String,
	address1 : String,
	email : String,
	phone1 : Number,
	phone2 : Number,
	isActive : Boolean,
	createAt : Date
	
	});

module.exports = mongoose.model('User', userSchema);
