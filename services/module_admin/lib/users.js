var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var korisnici = new Schema({
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

var Users = mongoose.model('Users', korisnici);
module.exports = Users;