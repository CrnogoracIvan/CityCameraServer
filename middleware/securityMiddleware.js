var securityHandler = require('../lib/security/securityHandler');

var Auth = {
  checkToken: function(req, res, next) {
    // check header or url parameters or post parameters for token
    var recToken = req.headers['authorization'] || req.headers['Authorization'];
    console.log(recToken)
    securityHandler.checkToken(recToken, function(err) {
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