var express = require("express");
var multer = require("multer"); //is midleware for handling multipart/form-data,(primarily used for uploading files)
var moment = require("moment"); //is js library for parsing, manipulating, validating and formating data
var fs = require("fs");
var path = require("path"); //This module contains utilities for handling and transforming file paths.

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        fs.exists(config.file.destination + "/" + moment().format("YYYY_MM_DD"), function (exists) {
            if (exists) {
                callback(null, config.file.destination + "/" + moment().format("YYYY_MM_DD"));
            } else {
                fs.mkdir(config.file.destination + "/" + moment().format("YYYY_MM_DD"), function (err) {
                    if (err) {
                       return err
                    } else {
                        callback(null, config.file.destination + "/" + moment().format("YYYY_MM_DD"));
                    }
                });
            }
        });
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }

});

var upload = multer({
    storage: storage
}).single("userphoto");


exports.upload = function (req, res, callback) {
    upload(req, res, function (err) {
        if (err) {
            console.log('errr', err)
            return err;
        }
        callback()
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
            files.map(function (file) {

                return path.join(config.file.destination, file); 
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

exports.files = function (req, res, next, callback) {

    var files = [];
    fs.readdir(config.file.destination + "/" + req.params.folder, function (err, filenames) {

        if (err) {
            return next(err);
        }
        var filesData = {
            files: files,
            path: "file/" + req.params.folder + "/file"
        };
        if (filenames.length == 0) {
            callback(filesData);
        }
        filenames.forEach(function (file, index, list) {

            fs.readFile(config.file.destination + "/" + req.params.folder + "/" + file, "base64", function (err, content) {
                if (err) {
                    return next(err);
                }
                files.push({
                    filename: file,
                    content: content
                });
                if (files.length - 1 === list.length - 1) {
                    callback(filesData)
                }
            });
        })
    });
};

exports.deleteFile = function (req, res, callback) {
    fs.unlink(config.file.destination + "/" + req.body.file, function (err) {
        if (err) {
            next(err);
        }
        callback();
    });

};
