var jwt = require('jsonwebtoken');
var Users = require('../db/model/users')

exports.checkTokenAdmin = function (recToken, callback) {
  jwt.verify(recToken, config.security.secret, function (err, decoded) {

    if (err) {
      console.log('error decoding token ' + err);
      return callback({
        code: 403,
        success: false,
        message: 'Failed to authenticate token.'
      });
    } else {
      // if everything is good, save to request for use in other routes
      if (decoded.id) {
        Users.findById(decoded.id, function (err, user) {
          if (user.isAdmin) {
            callback();
          } else {
            return callback({
              code: 403,
              success: false,
              message: 'Failed to authenticate token.'
            });
          }
        })

      } else {
        return callback({
          code: 403,
          success: false,
          message: 'Failed to authenticate token.'
        });
      }

    }
  });
};
exports.checkTokenUser = function (recToken, callback) {
  jwt.verify(recToken, config.security.secret, function (err, decoded) {
    if (err) {
      console.log('error decoding token ' + err);
      return callback({
        code: 403,
        success: false,
        message: 'Failed to authenticate token.'
      });
    } else {
      // if everything is good, save to request for use in other routes
      callback();
    }
  });
};