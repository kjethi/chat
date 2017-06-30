"use strict";
var rethinkdb = require('rethinkdb');
var db = require('../rtDb');
var async = require('async');
var dbConfig = require('../config/DbConfig').reThinkDb;

class messages {
  addNewMessage(MessageData,callback) {
    async.waterfall([
      function(callback) {
        var messageObject = new db();
        messageObject.connectToDb(dbConfig,function(err,connection) {
          if(err) {
            return callback(true,"Error connecting to database");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
    	  console.log(MessageData)
        rethinkdb.table('tbl_messages').insert({
            "sender_id" : MessageData.from_user,
            "receiver_id" : MessageData.to_user,
            "msg" : MessageData.msg,
            "date_time" : new Date(),
            "status" : 1 //read or unread(0 for read,1 for unread)
        }).run(connection,function(err,result) {
          connection.close();
          if(err) {
            return callback(true,"Error happens while adding new Message");
          }
          callback(null,result);
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }

  votePollOption(pollData,callback) {
    async.waterfall([
      function(callback) {
        var pollObject = new db();
        pollObject.connectToDb(function(err,connection) {
          if(err) {
            return callback(true,"Error connecting to database");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.table('poll').get(pollData.id).run(connection,function(err,result) {
          if(err) {
            return callback(true,"Error fetching polls to database");
          }
          for(var pollCounter = 0; pollCounter < result.polls.length; pollCounter++) {
            if(result.polls[pollCounter].option === pollData.option) {
              result.polls[pollCounter].vote += 1;
              break;
            }
          }
          rethinkdb.table('poll').get(pollData.id).update(result).run(connection,function(err,result) {
            connection.close();
            if(err) {
              return callback(true,"Error updating the vote");
            }
            callback(null,result);
          });
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }

  getAllPolls(callback) {
    async.waterfall([
      function(callback) {
        var pollObject = new db();
        pollObject.connectToDb(function(err,connection) {
          if(err) {
            return callback(true,"Error connecting to database");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        rethinkdb.table('poll').run(connection,function(err,cursor) {
          connection.close();
          if(err) {
            return callback(true,"Error fetching polls to database");
          }
          cursor.toArray(function(err, result) {
            if(err) {
              return callback(true,"Error reading cursor");
            }
            callback(null,result)
          });
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }
}

module.exports = messages;
