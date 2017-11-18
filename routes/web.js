const express = require('express')
const router = express.Router()
const AuthCheck = require('../middlewares/authentication');
const PostController = require('../controllers/PostController');
const ProfileController = require('../controllers/ProfileController');
const PagesController = require('../controllers/PagesController');
const path = require('path');
const crypto = require('crypto');
var multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'public/');
   },
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);
      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
 });
const upload = multer({ storage: storage });



router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect("/");
});

//posts controllerc
router.get('/', PostController.index);
router.get('/post/create',AuthCheck.auth ,PostController.create);
router.post('/post/store',upload.single('postImage'), PostController.store);
router.get('/post/:slug', PostController.show);
router.get('/post/:slug/edit', PostController.edit);

router.post('/post/update', PostController.update);

router.post('/comment/store', PostController.comment);

router.post('/q', PagesController.search);

router.get("/profile", AuthCheck.auth,ProfileController.index);
module.exports = router;
