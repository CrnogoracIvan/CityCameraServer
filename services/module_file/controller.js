var error = require('../../lib/error').error;
var provider = require('./providers/');

exports.upload = function (req, res, next) {
  console.log('upload ctrl');
  provider.upload(req, res, function (err, data) {
    res.status(200);
    res.json({
      isSuccess: true,
      message: 'Image uploaded!'
    });
  });
};
exports.getUploadURL = function (req, res, next) {
  provider.getUploadURL(req, res, function (err, url) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json(url);
  });
};

exports.folders = function (req, res, next) {
  provider.folders(function (err, folders) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json({
      folders: folders
    });
  });
};
exports.foldersByUserId = function (req, res, next) {
  provider.foldersByUserId(req, res, function (err, folders) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json({
      folders: folders
    });
  });
};
exports.files = function (req, res, next) {
  provider.files(req, res, function (err, files) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json(files);
  });
};
exports.filesByUserId = function (req, res, next) {
  provider.filesByUserId(req, res, function (err, files) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json(files);
  });
};
exports.deleteFile = function (req, res, next) {
  provider.deleteFile(req, res, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json({
      isSuccess: true
    });
  });
};