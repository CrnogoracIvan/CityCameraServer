/**
 * LogRequests middleware is reponsible for logging of all requests passed to system.
 *
 * It basically fetches the request, generates uuid and logs it to the console in standard way
 */
var logger = require("./../lib/logger");

var uuid   = require('node-uuid');
var config = require('../config/');

//generate uuid and log incoming requests
exports.logRequest = function(req, res, next) {
  req.uuid = uuid.v1();
  var data = {
    uuid: req.uuid,
    url: req.originalUrl || "",
    bodyParams: req.body || ""
  };
//    if (req.originalUrl.indexOf('/file/upload') > -1) logger.info(req.originalUrl);
//  else logger.info(JSON.stringify(data));
  next();
};