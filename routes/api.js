const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.render('home')
})

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

module.exports = router
