var error = require('../../lib/error').error;
var provider = require('./providers/');

exports.upload = function (req, res, next) {
  provider.upload(req, res, function () {
    res.status(200);
    res.json(url);
    res.json({
      isSuccess: true,
      message: 'Image uploaded!'
    });
  });
};
exports.getUploadURL = function (req, res, next) {
  provider.getUploadURL(req, res, function (err,url) {
    if (err) {
      return err;
    }
    res.status(200);
    res.json(url);
  });
};
exports.folders = function (req, res, next) {
  provider.folders(function (err,folders) {
    if (err) {
      return err;
    }
    res.status(200);
    res.json({
      folders: folders
    });
  });
};
exports.files = function (req, res, next) {
  provider.files(req, res, next, function (err,files) {
    if (err) {
      return err;
    }
    res.status(200);
    res.json(files);
  });
};

exports.deleteFile = function (req, res, next) {
  provider.deleteFile(req, res, function () {
    res.status(200);
    res.json({
      isSuccess: true
    });
  });
};
