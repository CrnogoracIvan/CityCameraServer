var Users = require('../schema/users');
var error = require('../../error').error;

exports.saveUser = function (username, data, callback) {
  var user = new Users({
    password: data.password,
    username: data.username,
    email: data.email
  });
  user.save(function (err) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    callback();
  });
};

exports.getUser = function (username, callback) {
  Users.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    callback(null, user);
  });
};

exports.findById = function (id, callback) {

  Users.findById(id, function (err, user) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    callback(null, user);
  });
};

exports.findAll = function (callback) {
  Users.find(function (err, data) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    callback(null, data);
  });
};
exports.findUpdateUser = function (id, data, callback) {
  Users.findById(id, function (err, user) {
    if (data.username != undefined) user.username = data.username;
    if (data.email != undefined) user.email = data.email;
    if (data.password != undefined) user.password = data.password;
    if (data.isAdmin != undefined) user.isAdmin = data.isAdmin;
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    user.save(function (err, user) {
      if (err) {
        return callback(error('INTERNAL_ERROR'));
      }
      callback(null, user);
    });
  });
}
