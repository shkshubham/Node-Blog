const express = require('express')
const router = express.Router()
const AuthCheck = require('../middlewares/authentication');
const PostController = require('../controllers/PostController');
const ProfileController = require('../controllers/ProfileController');
const PagesController = require('../controllers/PagesController');

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect("/");
});

//posts controllerc
router.get('/', PostController.index);
router.get('/post/create',AuthCheck.auth ,PostController.create);
router.post('/post/store', PostController.store);
router.get('/post/:slug', PostController.show);

router.post('/q', PagesController.search);

router.get("/profile", AuthCheck.auth,ProfileController.index);
module.exports = router;
