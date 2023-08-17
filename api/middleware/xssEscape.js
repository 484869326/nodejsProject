const xss = require('xss');
const {exec,escape}=require('../db/mysql');
const redisClient = require('../db/redis');

module.exports = (req, res, next) => {
  if(req.query){
    for (const key in req.query) {
      req.query[key]=escape(xss(req.query[key]));
   }
  }
   if(req.body){
    for (const key in req.body) {
      if(key!="picture" || req.body.picture){
        req.body[key]=escape(xss(req.body[key]));
      }
     }
   }

    next();
}