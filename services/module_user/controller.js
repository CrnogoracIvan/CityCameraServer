var storage = require('../../lib/db/model/users');
var jwt = require('jsonwebtoken');
var Q = require('q');
var error = require('../../lib/error').error;

exports.register = function (req, res, next) {

  var username = req.body.username;
  var userData = req.body;
  
  storage.getUser(username).then(function (data) {
    if (data) {
      return next(error('ALREADY_REGISTERED'));
    }
    if (req.body.username == '') {
      return next(error('LENGTH_REQUIRED'));
    }
    if (req.body.email == '') {
      return next(error('LENGTH_REQUIRED'));
    }
    if (req.body.password == '') {
      return next(error('LENGTH_REQUIRED'));
    }
    storage.saveUser(username, userData).then(function (data) {
      res.status(200);
      res.json({
        isSucces: true
      })
    }).fail(function (err) {
      logger.error('ERROR CTRL - regiser user ', err);
      return next(err);
    });
  }).fail(function (err) {
    logger.error('ERROR CTRL - check if user exists ', err);
    return next(err);
  });
};

exports.login = function (req, res, next) {

  var username = req.body.username;

  storage.getUser(username).then(function (data) {
    if (!data) {
      return next(error('NOT_FOUND'));
    }
    data = data.toJSON();
    if (data.password == req.body.password) {
      _generateToken(data, function (token) {
        data.token = token;
        console.log("login data + token: ", data)
        res.status(200);
        res.json({
          token: token,
          user: data
        });
      });
    } else {
      return next(error('WRONG_CREDENTIALS'));
    }
  }).fail(function (err) {
    logger.error('ERROR CTRL - login user ', err);
    return next(err);
  });
};

var _generateToken = function (data, callback) {
  var token = jwt.sign({
    username: data.username,
    id: data._id
  }, config.security.secret, {
    expiresIn: '24h' // expires in 24 hours
  });
  callback(token);
};


exports.listAllUsers = function (req, res, next) {

  storage.findAll().then(function (data) {
    res.status(200);
    res.json(data);
  }).fail(function (err) {
    logger.error('ERROR CTRL - list all users ', err);
    return next(err);
  });
};

exports.updateUser = function (req, res, next) {

  var userId = req.params.user_id;
  var userData = req.body;

  storage.findUpdateUser(userId, userData).then(function (user) {
    res.status(200);
    res.json(user);
  }).fail(function (err) {
    logger.error('ERROR CTRL - update users ', err);
    return next(err);
  });
}