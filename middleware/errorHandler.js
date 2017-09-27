/**
 * ErrorHandler middleware is responsible for handling all errors thrown by the system.
 *
 * It basically fetches the passed error string, reads values from errorCodes.js and setting the response to corresponding values
 */

var errors = require('../config/errorCodes');

//if type of error is string fetch the error from errorCodes file
//otherwise throw internal server err with error data
exports.errorHandler = function(err, req, res, next) {
  var error;
  if (typeof err === "string") {
    var error     = new Error();
    error.code    = errors.codes[err].code;
    error.message = errors.codes[err].message;
  } else { //internal server error
    error.code = 500;
    error      = new Error(err);
  }

  res.status(error.code);
  res.send({
    error: error
  });
};