var Users = require('./users');

/**
 * Store user to db
 * @param username
 * @param data
 * @param callback
 */
exports.saveUser = function(username, data, callback) {
  var user = new Users({
    password: data.password,
    username: data.username,
    email: data.email
  });
  user.save(function(err) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    callback();
  });
};

/**
 * Fetch user from db
 * @param username
 * @param callback
 */
exports.getUser = function(username, callback) {
  Users.findOne({username: username}, function(err, user) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    callback(null, user);
  });
};