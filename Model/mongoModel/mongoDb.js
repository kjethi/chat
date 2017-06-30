"use strict";
var mongoose = require('mongoose');
var dbConfig = require('../../config/DbConfig');

class mongoDb {
  connectToMongoDbServer(callback) {
	  mongoose.connect(dbConfig.mongoDb.url);
	  var db = mongoose.connection;
	  db.on('error' , function(err) {
		  if (err) throw err;
		  callback(true,'Something Wrong With Mongo Connection');
		  });
	  db.once('open', function(db) {
	    // we're connected!
		  callback(false,db)
	  });

  }
}

module.exports = mongoDb;

