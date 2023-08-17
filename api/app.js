var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs=require('fs');
const xssEscape=require("./middleware/xssEscape");
const session = require('express-session');
const redisClient = require('./db/redis');
let RedisStore = require('connect-redis')(session);
const goodRouter = require('./routes/good');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/orders');
const categoryRouter = require('./routes/category');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  app.use(logger('dev'));
} else {
  const logFileName = path.join(__dirname, 'log', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api',express.static(path.join(__dirname, 'public')));
// app.use(xssEscape);
app.use(session({
  store:sessionStore,
  secret: 'Linzhaojie',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
}))
//解决跨域,如果nginx，这个关掉也可以
app.use((req,res,next)=>{
		 // 设置允许跨域访问的域名，*代表允许所有域名访问，也可以指定具体的域名
		  res.setHeader('Access-Control-Allow-Origin', '*');
		  // 设置允许的请求方法
		  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		  // 设置允许的请求头
		  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
})
app.use('/api/good', goodRouter);
app.use('/api/users', usersRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err.name==='UnauthorizedError') {
    return res.json(
      "请重新登录"
    )
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
