const { REDIS_CONF } = require("../conf/db");
const { createClient } = require("redis")
let redisClient = createClient(REDIS_CONF);
redisClient.connect().catch(console.error)
module.exports = redisClient;
