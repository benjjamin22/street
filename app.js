var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require ('body-parser');
var fs = require ( 'fs') ;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var login = require('./routes/login');
//var id = require('./routes/id');
//var post = require('./routes/post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup static folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/login', login);
//app.use('/:id', id);
//app.use('/post', post);

const accounts = JSON.parse(fs.readFileSync('./data.json','utf-8'));
app.get('/:id', function handler(req, res,next) {
    
  try{
      const id = req.params.id;
      const foundUser = accounts.find((data) => id === data.id );
      if (foundUser ) {
          //req.session.user = foundUser.pine;
              res.render('result',{Name:foundUser.Aname.Name,Mname:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,
                  NIN:foundUser.NIN,Gender:foundUser.Gender,Day:foundUser.Ddateofbirth.Day,Month:foundUser.Ddateofbirth.Month,
                  Year:foundUser.Ddateofbirth.Year,Presentclass:foundUser.Presentclass,Bloodgroup:foundUser.Bloodgroup,
                  State:foundUser.State,School:foundUser.School,HometownCommunity:foundUser.HometownCommunity,
                  ParentPhoneNo:foundUser.ParentPhoneNo,ParentPhoneNo2:foundUser.ParentPhoneNo2,Picturepath:foundUser.client,
                  Status:foundUser.Status,id:foundUser.id,Status:foundUser.Status,time:foundUser.time});
          } else {
              res.render('ddx');
          }
     
  } catch{
      res.send("Internal server error");
      
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
