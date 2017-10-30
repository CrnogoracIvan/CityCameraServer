var error = require('../../lib/error').error;
var provider = require('./providers/');

exports.upload = function (req, res, next) {
  provider.upload(req, res, function () {
    res.status(200);
    res.json(urls);
    res.json({
      isSuccess: true,
      message: 'Image uploaded!'
    })
  });
};
exports.getUploadURL = function (req, res, next) {
  provider.getUploadURL(req, res, function (err, urlJson) {
    if (err){
      //TODO error handling
    } else {
      res.status(200);
      res.json(urlJson);
    }
  });
};
exports.folders = function (req, res, next) {
  provider.folders(function (folders) {
    res.status(200);
    res.json({
      folders: folders
    })
  });
};
exports.files = function (req, res, next) {
  provider.files(req, res, next, function (files) {
    res.status(200);
    res.json(files);
  });
};

exports.deleteFile = function (req, res, next) {
  provider.deleteFile(req, res, function () {
    res.status(200);
    res.json({
      isSuccess: true
    })
  });
};
