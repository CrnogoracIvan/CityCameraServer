var securityHandler = require('../lib/security/securityHandler');

var Auth = {
  checkTokenAdmin: function (req, res, next) {
    // check header or url parameters or post parameters for token
    var recToken = req.headers['x-access-token'];
    securityHandler.checkTokenAdmin(recToken, function (err) {
      if (err) {
        res.status(err.code);
        res.send(err.message);
        return;
      }

      next();
    });
  },
  checkTokenUser: function (req, res, next) {
    // check header or url parameters or post parameters for token
    var recToken = req.headers['x-access-token'];
    securityHandler.checkTokenUser(recToken, function (err) {
      if (err) {
        res.status(err.code);
        res.send(err.message);
        return;
      }
      next();
    });
  }

};

module.exports = Auth;