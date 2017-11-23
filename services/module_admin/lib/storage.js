var Admin = require('./admin');
var error = require('../../../lib/error').error;

/**
 * Store Admin to db
 * @param username
 * @param data
 * @param callback
 */
exports.saveAdmin = function(username, data, callback) {
  var admin = new Admin({
    password: data.password,
    username: data.username,
    email: data.email
  });
  admin.save(function(err) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    callback();
  });
};

/**
 * Fetch Admin from db
 * @param username
 * @param callback
 */
exports.getAdmin = function(username, callback) {
  Admin.findOne({username: username}, function(err, admin) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    callback(null, admin);
  });
};