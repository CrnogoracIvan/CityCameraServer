var storage = require('../../lib/db/model/users');
var jwt = require('jsonwebtoken');
var error = require('../../lib/error').error;

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
        return err;
      }
      res.status(200);
      res.json({
        isSucces: true
      });
    });
  });
};


exports.login = function (req, res, callback) {
  storage.getUser(req.body.username, function (err, data) {
    if (!data) {
      return callback(error('NOT_FOUND'));
    }
    data = data.toJSON();
    if (err) {
      return callback(error('WRONG_CREDENTIALS'));
    }
    if (data.password == req.body.password) {
      _generateToken(data, function (token) {
        data.token = token;
        console.log("login data + token: ", data)
        res.status(200);
        res.json({token: token, user:data});
      });
    } else {
      return callback(error('WRONG_CREDENTIALS'));
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
  var token = jwt.sign({
    username: data.username,
    id: data._id
  }, config.security.secret, {
    expiresIn: '24h' // expires in 24 hours
  });
  callback(token);
};


exports.listAllUsers = function (req, res, next) {
  storage.findAll(function (err, data) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json(data);
  });
};

exports.updateUser = function (req, res, callback) {
  storage.findUpdateUser(req.params.user_id, req.body, function (err, user) {
    if (err) {
      return err;
    }
    res.status(200);
    res.json(user);
  })
}


