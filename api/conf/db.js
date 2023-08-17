const env=process.env.NODE_ENV
let MYSQL_CONF,REDIS_CONF;

if(env==="dev"){
	MYSQL_CONF={
		host:"localhost",
		user:"root",
		password:"root",
		port:"3306",
		database:"tansuoshop",
		timezone: "08:00"
	};
	REDIS_CONF={ legacyMode: true };
}
if(env==="production"){
	MYSQL_CONF={
		host:"localhost",
		user:"root",
		password:"root",
		port:3306,
		database:"tansuoshop",
		timezone: "08:00"
	};
	REDIS_CONF={ legacyMode: true };
	// REDIS_CONF={
	// 	url: 'redis://alice:foobared@awesome.redis.server:6380'
	//   };
}
module.exports={
	MYSQL_CONF,
	REDIS_CONF
}