var mysql = require('mysql');

class mySqlConnection{
	constructor(x, y) {
		this.con=null;
	}
	openConnection(host,user,pwd,dbname='',callback){
		if(dbname){
			var params={
					  host: host,
					  user: user,
					  password: pwd,
					  database: dbname
					}
			}else{
				var params={
						  host: host,
						  user: user,
						  password: pwd
						}
			}

		this.con = mysql.createConnection(params);	
		
		this.con.connect(function(err) {
		  if (err)  throw err;
		  return callback('SuccessFully Connected With MySql,,,,,Database is :'+dbname);
		});
	}
	mysqlQueryResults(){
		this.con.connect(function(err) {
		  if (err) return null;
		  this.con.query(sql, function (err, result) {
		    if (err) return null;
		    return result;
		  });
		}); 
	}
}

module.exports=mySqlConnection;