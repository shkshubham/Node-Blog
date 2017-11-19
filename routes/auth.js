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

/*
router.get('/stack/callback',(req,res)=>{
  passport.serializeUser((user_id,done)=>{
    done(null, user_id)
  });

  passport.deserializeUser((user_id,done)=>{
      done(null,user_id)
  });
  var user = {
    user_id: 1234
  };
  console.log(user)
  req.login(user, function(err){
    console.log(err)
  })
});

*/

router.get('/stack-exchange',passport.authenticate('stackexchange'));

router.get('/stack-exchange/callback',
    passport.authenticate('stackexchange', { failureRedirect: '/login' }),
    function(req, res) {
      console.log(req.body);
        res.redirect('/');
    });


module.exports = router;
