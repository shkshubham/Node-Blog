const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res)=>{
  res.render('auth/login');
});

router.get('/google', passport.authenticate("google",{
  scope : ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate("google"), (req,res)=>{
  res.redirect('/profile');
});

router.get('/github', passport.authenticate("github"), (req,res)=>{
 scope: [ 'user:email' ];
});

router.get('/github/callback', passport.authenticate("github"), (req,res)=>{
  res.redirect('/profile');
});

router.get('/stack', passport.authenticate("stack"),(req,res)=>{
  scope: [ 'private_info' ];
});

router.get('/stack/callback', passport.authenticate("stack"),(req,res)=>{
  return res.send(req.body);
});



module.exports = router;
