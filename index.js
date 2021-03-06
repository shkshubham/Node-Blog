const express = require("express");
const session = require("express-session");
const routes = require('./routes/web');
const auth_routes = require('./routes/auth');
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const passportConfig = require('./config/passport');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const AuthCheck = require('./middlewares/authentication');
const helpers = require('./utils/helpers');
mongoose.Promise = global.Promise;


//-------------------------handlebars---------------------------
var hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: [
    'shared/templates/',
    'views/partials/'
  ],
  helpers: {
      Titleslice: helpers.Titleslice,
      Bodyslice: helpers.Bodyslice,
      ifvalue: helpers.ifvalue,
      datetime: helpers.datetime,
      bar: function () {
      return 'BAR!';
    }
  }
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//-------------------------xx-------------------------------

app.use(cookieSession({
    maxAge: 24*60*60**1000,
    keys: [keys.session.cookieKey]
}));

//-----------------------initialize passport-------------------
app.use(session({
  secret: keys.session.cookieKey,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

//--------------------------xx-------------------------------

//connect to mongodb
mongoose.connect(keys.mongodb.url, ()=>{
  console.log("connected to db");
});

//--------------------------bodyParser---------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//--------------------------rooutes------------------------------
app.use(routes);
app.use('/auth',AuthCheck.notAuth, auth_routes)
app.use('/public', express.static('public'));

//---------------------------server-------------------------------


const server_port = process.env.PORT || 4000;
app.listen(server_port, function(){
  console.log("server started");
});
