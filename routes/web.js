const express = require('express')
const router = express.Router()
const AuthCheck = require('../utils/authentication');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.render('home', {
    user: req.user
  })
})

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect("/");
});

router.get('/post', function (req, res) {
  res.send('post')
})
router.post('/post', function (req, res) {
  console.log(req.body);
  res.send({
      type: 'POST',
      name: req.body.name
    });
})

router.get("/profile", AuthCheck.auth,(req, res)=>{
  console.log(req.user);
  res.render('profile',{
    user:req.user
  });
});
module.exports = router;
