const Post = require('../models/Post');
var search = function(req, res){
  console.log(req.body)
  Post.find({
    title: req.body.serach
  }).then((posts)=>{
    console.log(posts)
  });
};


module.exports = {
  search
};
