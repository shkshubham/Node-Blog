const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res)=>{
  res.render('auth/login');
});

router.get('/logout', (req, res)=>{
  res.send("logging out");
});

router.get('/google', passport.authenticate("google",{
  scope: ["profile"]
}));

router.get('/google/callback', passport.authenticate("google"), (req,res)=>{
  res.send(req.user);
});

module.exports = router;
