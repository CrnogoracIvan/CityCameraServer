exports.logRequest = function(req, res, next) {
  var data = {
    type: req.method,
    url: req.originalUrl || "",
    pathParams: req.params || "",
    queryParams: req.query || "",
    bodyParams: req.body || ""
  };
//   if (data.url.indexOf('/file') == 0)
//    logger.info(data);
  next();
};

exports.logErrors = function(err, req, res, next) {
  var data = {
    type: req.method,
    url: req.originalUrl || "",
    pathParams: req.params || "",
    queryParams: req.query || "",
    bodyParams: req.body || "",
    stack: err.stack || ""
  };
  logger.error(data);
  next(err);
};