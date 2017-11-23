var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

var Users = mongoose.model('Users', users);
module.exports = Users;