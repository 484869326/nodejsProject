const mysql=require("mysql");
const {MYSQL_CONF}=require("../conf/db");
let conn=mysql.createConnection(MYSQL_CONF);
function sqlConnect(){
	conn.connect(err=>{
		if(err) {
			conn=mysql.createConnection(MYSQL_CONF);
			setTimeout(sqlConnect, 2000);
		  } 
	});
}
sqlConnect();
conn.on('error',err=>{
	if(err){
		conn=mysql.createConnection(MYSQL_CONF);
		sqlConnect();
	}
})
function exec(sql){
	const promise=new Promise((resolve,reject)=>{
		conn.query(sql,(err,result)=>{
			if(err){
				reject(err);
				return;
			}
			resolve(result);
		});
	})
	return promise;
}
module.exports={
	exec,
	escape:mysql.escape
}