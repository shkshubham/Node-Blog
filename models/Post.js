const mongoose = require('mongoose');
const User = require('../models/User');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
    title: String,
    body: String,
    slug: String,
    created_at: {
      type:Date,
      Datedefault: Date.now
    },
    comments: [{
        text: String,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});
const Post = mongoose.model("post",PostSchema);

module.exports = Post;
