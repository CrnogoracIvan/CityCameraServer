var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// module.exports = mongoose.model('Users', new Schema({
// 	username: String,
// 	password: String,
// 	email: String
// }));

var korisnici = new Schema({
  username: String,
  password: String,
  email: String
});

var Users = mongoose.model('Users', korisnici);
module.exports = Users;