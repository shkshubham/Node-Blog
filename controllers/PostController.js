const User = require('../models/User');
const Post = require('../models/Post');
const slugify = require('slugify');


var index = function(req, res) {
  Post.find({},
    function(err,docs){}).sort({created_at:-1})
    .then((posts)=>{
    res.render('posts/index',{
      user: req.user,
      posts:posts
    });
  });

};

var store = function (req, res) {
    var slug = slugify(req.body.title);
    new Post({
      user_id: req.user.id,
      title: req.body.title,
      body: req.body.content,
      image: req.file.filename,
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

var edit = function(req, res){
  var posts = Post.findOne({
    slug : req.params.slug
  }).then((post)=>{
    User.findOne({
      _id: post.user_id
    }).then((user)=>{
      res.render('posts/edit',{
        post: post,
        user_name: user.name,
        user: req.user
      });
    });
  });
}

var update = function(req, res){
  res.send(req.body)
}

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

var comment = function(req, res){
  var user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    avatar: req.user.avatar,
  }
  var comment = {
    user : req.user,
    text: req.body.text
  };
  Post.update({
    slug: req.body.post_slug
    },
    {
      $push: {comments: comment}
    },function(err, data){
      console.log(data);
    });
    res.redirect('/');
};

module.exports = {
  index,
  store,
  create,
  show,
  comment,
  edit,
  update
}
