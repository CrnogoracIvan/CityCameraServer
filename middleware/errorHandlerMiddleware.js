//if type of error is string fetch the error from errorCodes file
//otherwise throw internal server err with error data
exports.errorHandlerMiddleware = function(err, req, res, next) {
  //res.status(err.code);
  res.status(err.code >= 100 && err.code < 600 ? err.code : 500);
  res.send({error: err});
};