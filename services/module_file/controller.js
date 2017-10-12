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
exports.upload = function (res, req, next) {
};

exports.folders = function (res, req, next) {
  provider.folders(function(folders) {
  res.status(200);
   res.json({folders:folders})
  });
}

/**
 * List all files and folders
 * @param req
 * @param res
 * @param next
 */
exports.files = function (req, res, next) {}
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

};
