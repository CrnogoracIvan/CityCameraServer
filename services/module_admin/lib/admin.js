var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moderator = new Schema({
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
  }
});

var Admin = mongoose.model('Admin', moderator);
module.exports = Admin;