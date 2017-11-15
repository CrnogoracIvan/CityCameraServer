var express = require("express");
var multer = require("multer"); //is midleware for handling multipart/form-data,(primarily used for uploading files)
var moment = require("moment"); //is js library for parsing, manipulating, validating and formating data
var fs = require("fs");
var path = require("path"); //This module contains utilities for handling and transforming file paths.
var folders = require('../../../lib/db/model/folders');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {

        callback(null, config.file.destination + "/");
    },
    filename: function (req, file, callback) {
        console.log('filname multer', file);
        console.log('muler req', req.params.userId);
        console.log('muler file.originalname>>>>>>', file.originalname);
        file.originalname = req.params.userId + '.jpg'
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single("userphoto");


exports.upload = function (req, res, callback) {
    upload(req, res, function (err) {
        if (err) {
            return err;
        }
        callback();
    });
};
exports.getUploadURL = function (req, res, callback) {
    var fileName = req.body.file;
    var fileExt = req.body.ext;

    folders.saveFile({
        userId: req.params.userId,
        filename: fileName,
        ext: fileExt
    }).then(function (saved) {
        callback(null, config.serverURL + '/file/' + saved._id + '/upload');
    })

};
exports.folders = function (callback) {
    folders.returnAllFolders(function (err, data) {
        if (err) return err;
        callback(null, data);
    })

};
exports.foldersByUserId = function (req, res, callback) {
    try {
        folders.retrunFoldersByUserId(req.params.id).then(function (data) {

            callback(null, data);

        }).fail(function (err) {

            return callback(err);
        })
    } catch (e) {
        console.log('greska', e)
    };

};
exports.files = function (req, res, callback) {

    folders.retrunAllFiles(req.params.folder).then(function (data) {

        var files = data.files;
        var listAllFiles = [];

        files.forEach(function (fileName, index, list) {

            fs.readFile(config.file.destination + "/" + fileName._id + '.' + fileName.ext, "base64", function (err, content) {
               
                var filesData = {
                    files: listAllFiles,
                    path: "file/" + fileName._id + '.' + fileName.ext + "/file"
                };

                listAllFiles.push({
                    content: content,
                    filename: fileName.filename,
                    _id: fileName._id,
                    ext: fileName.ext,

                })

                if (listAllFiles.length - 1 === list.length - 1) {

                    callback(null, filesData)
                }

            });


        })

    })
};
exports.filesByUserId = function (req, res, callback) {
    try {
        folders.retrunFilesByUserId(req.params.id, req.params.folder).then(function (data) {

            var files = data.files;
            var listAllFiles = [];

            files.forEach(function (fileName, index, list) {

                fs.readFile(config.file.destination + "/" + fileName._id + '.' + fileName.ext, "base64", function (err, content) {
                    var filesData = {
                        files: listAllFiles,
                        path: "file/" + fileName._id + '.' + fileName.ext + "/file",
                    };
                    listAllFiles.push({
                        content: content,
                        filename: fileName.filename,
                        _id: fileName._id,
                        ext: fileName.ext
                    })
                    if (listAllFiles.length - 1 === list.length - 1) {
                        callback(null, filesData)
                    }
                });
            })

        }).fail(function (err) {
            return callback(err);
        })
    } catch (e) {
        console.log('greska2', e)
    };
}

exports.deleteFile = function (req, res, callback) {
    fs.unlink(config.file.destination + "/" + req.body.file, function (err) {
        if (err) {
            return err;
        } else {
            callback(
                folders.deleteFileByUser(req.params.id).then(function (data) {
                    callback(null, data);
                })
            );
        }
    });

};