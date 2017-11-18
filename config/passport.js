const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GitHubStrategy = require('passport-github2').Strategy;
const Oauth2Strategy = require('passport-oauth2').Strategy;
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user,done)=>{
  done(null, user.id)
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user)
  });
});

passport.use(new GoogleStrategy({
  callbackURL : "/auth/google/callback",
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done)=>{
  console.log(profile._json);
    User.findOne({
      email: profile._json.emails[0].value
    }).then((currentUser)=>{
      if(currentUser){
        done(null, currentUser)
      }
      else{
        new User({
          username: profile._json.nickname,
          google_id: profile._json.id,
          name: profile._json.displayName,
          avatar: profile._json.image.url,
          email: profile._json.emails[0].value

        }).save().then((newUser)=>{
          done(null, newUser)
        });
      }
    });
}));


passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done)=>{
    console.log(profile);
      User.findOne({
        github_id: profile.id
      }).then((currentUser)=>{
        if(currentUser){
          done(null, currentUser)
        }
        else{
          new User({
            username: profile._json.login,
            github_id: profile._json.id,
            name: profile._json.name,
            avatar: profile._json.avatar_url,

          }).save().then((newUser)=>{
            done(null, newUser)
          });
        }
      });
  }
));



passport.use('stack-oauth2',new Oauth2Strategy({
    authorizationURL: 'https://stackexchange.com/oauth',
    tokenURL: 'https://stackexchange.com/oauth/access_token',
    clientID: 11276,
    clientSecret: "tWJ6z6HAr90QaUGYwfSRng((",
    callbackURL: "http://pacific-crag-58243.herokuapp.com/auth/stack/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
  }
));
