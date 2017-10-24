var express = require("express");
var error = require('../../lib/error').error;
var provider = require('./providers/');

exports.upload = function (req, res, next) {
  provider.upload(req, res, function () {
    res.status(200);
    res.json({
      isSuccess: true,
      message:'Image uploaded!'
    })
  });
};
exports.uploadAws  = function (req, res, next) {
  console.log('in ctrl')
  provider.uploadAws(req, res, function (data) {
    console.log('in ctrl inside',data)
    res.status(200);
    res.json(data)
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
      ///console.log('files...........',files)
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


/**
 * Fetch file from specific path
 */
exports.file = function (req, res, next) {
  //todo: empty
};


