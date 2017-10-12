var express = require("express");
var error = require('../../lib/error').error;
var provider = require('./providers/');


exports.upload = function (res, req, next) {
  console.log('Usao sam u controler Upload')
  provider.upload();
};

exports.folders = function (res, req, next) {
  console.log('Usao sam u controler folders', provider)

  provider.folders().then(function (result) {
    console.log('result is', result)
    res.json(result);
  });
  console.log('Zavrsio sam sam u controler folders')
}


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