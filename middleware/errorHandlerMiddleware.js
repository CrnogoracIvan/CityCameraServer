//if type of error is string fetch the error from errorCodes file
//otherwise throw internal server err with error data
exports.errorHandlerMiddleware = function(err, req, res, next) {
  res.status(err.code);
  res.send({error: err});
};