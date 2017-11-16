var Users = require('../schema/users');
var error = require('../../error').error;
var Q = require('q');

exports.saveUser = function (username, data) {
  console.log('MD username, data', username, data)
  var deferred = Q.defer();
  var user = new Users({
    password: data.password,
    username: data.username,
    email: data.email
  });
  console.log('MD new user', user)
  user.save(function (err, user) {
    if (err) {
      logger.error('ERROR saving users to DB ', err)
      return deferred.reject(error('MONGO_ERROR'));
    }
    deferred.resolve(user);

  });
  return deferred.promise;
};

exports.getUser = function (username) {
  var deferred = Q.defer();
  Users.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      logger.error('ERROR find user ', err)
      return deferred.reject(error('MONGO_ERROR'));
    }
    deferred.resolve(user);
  });
  return deferred.promise;
};

exports.findById = function (id, callback) {

  Users.findById(id, function (err, user) {
    if (err) {
      logger.error('ERROR find user by ID ', err)
      return callback(error('MONGO_ERROR'));
    }
    callback(null, user);
  });
};

exports.findAll = function (callback) {
  Users.find(function (err, data) {
    if (err) {
      logger.error('ERROR find all users ', err)
      return callback(error('MONGO_ERROR'));
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
      logger.error('ERROR find and update ', err)
      return callback(error('MONGO_ERROR'));
    }
    user.save(function (err, user) {
      if (err) {
        logger.error('ERROR saving updated users to DB ', err)
        return callback(error('MONGO_ERROR'));
      }
      callback(null, user);
    });
  });
}