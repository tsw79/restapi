// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('file-system');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * Options:
 * --------
 *  - useCreateIndex: true,
 *  - useFindAndModify: false,
 *  - autoIndex: false,               // Don't build indexes
 *  - poolSize: 10,                   // Maintain up to 10 socket connections
 *  - erverSelectionTimeoutMS: 5000,  // Keep trying to send operations for 5 seconds
 *  - socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
 *  - family: 4                       // Use IPv4, skip trying IPv6
 */
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to mongodb
mongoose.connect('mongodb://localhost:27017/moviesdb', dbOptions)
.then(() => console.log('Connection to MongoDB has been made!'))
.catch(err => {
  console.log(err.reason);
  console.error('App starting error:', err.stack);
  process.exit(1);
});

// Include controllers
fs.readdirSync('controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    const route = require('./controllers/' + file);
    route.controller(app);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function() { 
  console.log('API Server listening on port 3000') }
),

module.exports = app;
