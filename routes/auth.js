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

router.get('/stack/callback',(req,res)=>{
  req.session.passport.user = {
    id: req.body.account_id
  }
  passport.serializeUser((user,done)=>{
    done(null, user)
  });

  passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
      done(null,user)
    });
  });
  req.login(req.body.account_id, function (err, data) {
                if ( ! err ){
                    res.redirect('/account');
                } else {
                    console.log(data)
                }
            })
});

module.exports = router;
