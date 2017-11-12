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
  console.log(profile);
    User.findOne({
      google_id: profile.id
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

        }).save().then((newUser)=>{
          done(null, newUser)
        });
      }
    });

}));
