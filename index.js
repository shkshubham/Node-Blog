const express = require("express");
const routes = require('./routes/api');
const auth_routes = require('./routes/auth');
const bodyParser = require("body-parser");
const hbs = require('express-handlebars');
const passportConfig = require('./config/passport');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieSession({
    maxAge: 24*60*60**1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//connect to mongodb
mongoose.connect(keys.mongodb.url, ()=>{
  console.log("connected to db");
});

app.use(bodyParser.json());
app.use(routes);
app.use('/auth',auth_routes)
app.listen(process.env.port|| 4000, function(){
  console.log("server started");
});
