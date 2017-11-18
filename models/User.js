const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  google_id:String,
  avatar: String,
  github_id: {
        type:String,
        default: null
      },
  facebook_id: {
      type:String,
      default: null
      },
});
const User = mongoose.model("user",UserSchema);

module.exports = User;
