var errorCodes = require('../config/errorCodes');

exports.error = function(err, stack) {
  var e = {};
  if (typeof err === "string") {
    e.code    = errorCodes.codes[err].code;
    e.message = errorCodes.codes[err].message;
    e.stack   = stack;
  } else {
    e.code    = err.code;
    e.message = err.message;
    e.stack   = err.stack;
  }

  return e;
};