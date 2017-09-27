var jwt            = require('jsonwebtoken');
exports.checkToken = function(recToken, callback) {
  jwt.verify(recToken, config.security.secret, function(err, decoded) {
    if (err) {
      console.log('error decoding token ' + err);
      return callback({code: 403, success: false, message: 'Failed to authenticate token.'});
    } else {
      // if everything is good, save to request for use in other routes
      callback();
    }
  });
};