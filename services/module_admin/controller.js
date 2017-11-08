var storage = require('./lib/storage');
var jwt = require('jsonwebtoken');
var error = require('../../lib/error').error;
/**
 * Register new user
 * @param req
 * @param res
 * @param callback
 */
exports.register = function (req, res, callback) {
  storage.getUser(req.body.username, function (err, data) {
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }
    if (data) {
      return callback(error('ALREADY_REGISTERED'));
    }
    if (req.body.username == '') {
      return callback(error('LENGTH_REQUIRED'));
    }
    if (req.body.email == '') {
      return callback(error('LENGTH_REQUIRED'));
    }
    if (req.body.password == '') {
      return callback(error('LENGTH_REQUIRED'));
    }
    storage.saveUser(req.body.username, req.body, function (err) {
      if (err) {
        return callback(error('INTERNAL_ERROR'));
      }
      callback();
    });
  });
};

/**
 * Authenticate already registered user
 * @param req
 * @param res
 * @param callback
 */
exports.login = function (req, res, callback) {
  storage.getUser(req.body.username, function (err, data) {
    if (!data) {
      return callback(error('NOT_FOUND'));
    }
    data = data.toJSON();
    if (err) {
      return callback(error('INTERNAL_ERROR'));
    }

    if (data.password == req.body.password) {
      _generateToken(data, function (token) {
        data.token = token;
        console.log("login data + token: ", data)
        return callback(null, data);

      });
    } else {
      callback(error('INTERNAL_ERROR'));
    }
  });

};

/**
 * Generate jwt token
 * @param data
 * @param callback
 * @private
 */
var _generateToken = function (data, callback) {
  var token = jwt.sign(data.username, config.security.secret, {
    expiresIn: '24h' // expires in 24 hours
  });
  callback(token);
};