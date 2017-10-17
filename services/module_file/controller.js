var express = require("express");
var error = require('../../lib/error').error;
var provider = require('./providers/');

/**
 * Upload a file to a specific destination
 *
 * @param req
 * @param res
 * @param next
 */
exports.upload = function (req, res, next) {};


exports.folders = function (req, res, next) {
  provider.folders(function (folders) {
    console.log('folders//////>>>', folders)
    res.status(200);
    res.json({
      folders: folders
    })
  });
};
exports.files = function (req, res, next) {
  console.log('choose storage')
  if (config.provider == 'local') {
    provider.files(req, res, next, function (files) {
      //  console.log('files>>>>',files)
      res.status(200);
      res.json(files);
    });
  } else {
    console.log('s3');
    provider.files(function (files) {
      //console.log('files>>>>', files)
      res.status(200);
      res.json({
        s3files: files
      });
    });
  }
};






/**
 * Fetch file from specific path
 */
exports.file = function (req, res, next) {
  //todo: empty
};

/**
 * Delete a file by filename
 * @param req
 * @param res
 */
exports.deleteFile = function (req, res, next) {
 console.log('files>>>>')
  provider.deleteFile(req, res, function () {
    res.status(200);
    res.json({
      isSuccess: true
    })
  });
};