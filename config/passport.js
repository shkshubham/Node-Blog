const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
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
    User.findOne({
      google_id: profile.id
    }).then((currentUser)=>{
      if(currentUser){
        done(null, currentUser)
      }
      else{
        new User({
          username: profile.nickname,
          google_id: profile.id,
          name: profile.displayName
        }).save().then((newUser)=>{
          done(null, newUser)
        });
      }
    });

}));
