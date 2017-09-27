/**
 * LogError middleware is reponsible for logging of all errors thrown by the system.
 *
 * It basically fetches the error and logs it to the console in standard way
 */
var logger = require("./../lib/logger");

exports.logErrors = function(err, req, res, next) {
  var data = {
    uuid: req.uuid,
    url: req.originalUrl || "",
    err: err || "",
    bodyParams: req.body || "",
    stack: err.stack || ""
  };
  logger.error(data);
  next(err);
};