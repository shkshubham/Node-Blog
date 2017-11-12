const User = require('../models/User');
const Post = require('../models/Post');
const slugify = require('slugify');

var index = function(req, res) {
  Post.find().then((posts)=>{
    res.render('posts/index',{
      user: req.user,
      posts:posts
    });
  });

};

var store = function (req, res) {
    var slug = slugify(req.body.title)
    new Post({
      user_id: req.user.id,
      title: req.body.title,
      body: req.body.content,
      slug:slug,
    }).save().then((newPost)=>{
      res.redirect('/');
    });
};

var create = function(req, res) {
  res.render('posts/create',{
    user: req.user
  });
};

var show = function(req, res) {
  var posts = Post.findOne({
    slug : req.params.slug
  }).then((post)=>{
    User.findOne({
      _id: post.user_id
    }).then((user)=>{
      res.render('posts/show',{
        post: post,
        user_name: user.name,
        user: req.user
      });
    });

  });
};

module.exports = {
  index,
  store,
  create,
  show
}
