var express = require("express");
var multer = require("multer"); //is midleware for handling multipart/form-data,(primarily used for uploading files)
var moment = require("moment"); //is js library for parsing, manipulating, validating and formating data
var fs = require("fs");
var path = require("path"); //This module contains utilities for handling and transforming file paths.
var Q = require("q");

/**
 * Creating folder if not exists with date
 *
 * @param  {[type]} req       [description]
 * @param  {[type]} file      [description]
 * @param  {[type]} callback) {                                                                                                                                                                                                 
 * @param  {[type]} filename: function(req, file, callback)
 * @return {[type]}           [description]
 */


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("storage destnation function");
        fs.exists(config.file.destination + "/" + moment().format("YYYY_MM_DD"), function (exists) {
            if (exists) {
                callback(null, config.file.destination + "/" + moment().format("YYYY_MM_DD"));
            } else {
                fs.mkdir(config.file.destination + "/" + moment().format("YYYY_MM_DD"), function (err) {
                    if (err) {
                        console.log("Greska u kreiranju foldera ", err);
                    } else {
                        console.log("uspesno kreirao folder");
                        callback(null, config.file.destination + "/" + moment().format("YYYY_MM_DD"));
                    }
                });
            }
        });
    },

    filename: function (req, file, callback) {
        // console.log("file za upload je", file.originalname);
        callback(null, file.originalname);
    }
});
// **** end of creating folder **** //

var upload = multer({
    storage: storage
}).single("userphoto"); // .single smesta file  fo

exports.upload = function () {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.", err);
        }
        res.end("File is uploaded");
    });
};

exports.folders = function (callback) {
    var folders = [];
    fs.readdir(config.file.destination, function (err, files) {
        if (err) {
            return err
        }
        //return empty list
        if (files.length === 0) {
            return ({
                folders: folders
            });
        } else {
            files.map(function (file) { // map() funckija kreira novi niz

                return path.join(config.file.destination, file); //path.join() pravi putanju, odnosno spaja putanjau od onoga sto joj prosledimo
            }).filter(function (file) {

                return fs.statSync(file).isDirectory();
            }).forEach(function (file, index, list) {

                file = path.basename(file);
                folders.push(file);
                if (index == list.length - 1) {
                    return ({
                        folders: folders
                    });
                }
            });
        }
        callback(folders);
    });
};
/**
 * List all files and folders
 * @param req
 * @param res
 * @param callback
 */
exports.files = function (req, res, callback) {
    var folderData = {};
    fs.readdir(config.file.destination + "/" + req.params.folder, function (err, filenames) {
        var files = [];

        if (err) {
            return err;
        }

        filenames.forEach(function (file, index, list) {

            fs.readFile(config.file.destination + "/" + req.params.folder + "/" + file, "base64", function (err, content) {

                if (err) {
                    return err;
                }

                files.push({
                    filename: file,
                    content: content
                });
                folderData = {
                    files: files,
                    path: "file/" + req.params.folder + "/file"
                };
                if (index == list.length - 1) {
                    console.log("==================");
                    console.log(list.length);
                    console.log("==================");
                    callback(folderData);
                }

            });

        })

    });
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
exports.deleteFile = function (req, res, callback) {
    //console.log(config.file.destination + "/" + req.body.file);
    fs.unlink(config.file.destination + "/" + req.body.file, function (err) {
        if (err) {
            next(err);
        }
        return callback();
    });

};