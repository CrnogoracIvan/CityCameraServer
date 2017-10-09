var storage = require('./lib/storage');
var jwt = require('jsonwebtoken');

/**
 * Register new user
 * @param req
 * @param res
 * @param callback
 */
exports.register = function (req, res, callback) {
  storage.getUser(req.body.username, function (err, data) {
    if (err) {
      return callback(err);
    }
    if (data) {
      return callback({
        message: 'Already registered '
      }, err);
    }
    if (req.body.username == '') {
      return callback({
        message: 'Lenght required'
      }, err);
    }
    if (req.body.email == '') {
      return callback({
        message: 'Lenght required'
      }, err);
    }
    if (req.body.password == '') {
      return callback({
        message: 'Lenght required'
      }, err);
    }
    storage.saveUser(req.body.username, req.body, function (err) {
      if (err) {
        return callback(err);
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
      return callback({
        message: 'User not found'
      }, err);
    }
    data = data.toJSON();

    if (err) {
      return callback(err);
    }

    if (data.password == req.body.password) {
      _generateToken(data, function (token) {
        data.token = token;
        return callback(null, data);
      });
    } else {
      return callback({
        message: 'Password is wrong'
      }, err);
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