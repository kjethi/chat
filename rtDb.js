"use strict";
var rethinkdb = require('rethinkdb');
var async = require('async');

class db {
  setupDb(dbParams) {
	  var self = this;
	  var dbParams = dbParams;
    async.waterfall([
      function(callback) {
        self.connectToRethinkDbServer(dbParams,function(err,connection) {
          if(err) {
        	  console.log(err)
            return callback(true,"Error in connecting RethinkDB");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
    	  console.log(dbParams)
        rethinkdb.dbCreate(dbParams.dbname).run(connection,function(err, result) {
          if(err) {
            console.log("Database already created");
          } else {
            console.log("Created new database");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.db(dbParams.dbname).tableCreate(dbParams.table_names).run(connection,function(err,result) {
          connection.close();
          if(err) {
            console.log("table already created");
          } else {
            console.log("Created new table");
          }
          callback(null,"Database is setup successfully");
        });
      }
    ],function(err,data) {
      console.log(data);
    });
  }

  connectToRethinkDbServer(dbParams,callback) {
    rethinkdb.connect({
      host : dbParams.host,
      port : dbParams.port
    }, function(err,connection) {
      callback(err,connection);
    });
  }

  connectToDb(dbParams,callback) {
    rethinkdb.connect({
      host : dbParams.host,
      port : dbParams.port,
      db : dbParams.dbname
    }, function(err,connection) {
      callback(err,connection);
    });
  }
}

module.exports = db;
