var Users = require('../schema/users');
var error = require('../../error').error;
var Q = require('q');

exports.saveUser = function (username, data) {
  var deferred = Q.defer();

  var user = new Users({
    password: data.password,
    username: data.username,
    email: data.email
  });

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

exports.findById = function (id) {
  var deferred = Q.defer();

  Users.findById(id, function (err, user) {
    if (err) {
      logger.error('ERROR find user by ID', err)
      return deferred.reject(error('MONGO_ERROR'));
    }
    deferred.resolve(user);
  });

  return deferred.promise;
};

exports.findAll = function () {
  var deferred = Q.defer();

  Users.find(function (err, data) {
    if (err) {
      logger.error('ERROR find all users ', err)
      return deferred.reject(error('MONGO_ERROR'));
    }
    deferred.resolve(data)
  });

  return deferred.promise;
};

exports.findUpdateUser = function (id, data) {
  var deferred = Q.defer();

  Users.findById(id, function (err, user) {
    if (data.username != undefined) user.username = data.username;
    if (data.email != undefined) user.email = data.email;
    if (data.password != undefined) user.password = data.password;
    if (data.isAdmin != undefined) user.isAdmin = data.isAdmin;
    if (err) {
      logger.error('ERROR find and update ', err)
      return deferred.reject(error('MONGO_ERROR'));
    }
    user.save(function (err, user) {
      if (err) {
        logger.error('ERROR saving updated users to DB ', err)
        return deferred.reject(error('MONGO_ERROR'));
      }
      deferred.resolve(data)
    });
  });

  return deferred.promise;
}