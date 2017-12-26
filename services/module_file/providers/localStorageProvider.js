var express = require("express");
var Q = require('q');
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

        var findExt = file.originalname.lastIndexOf(".");
        var ext = file.originalname.substring(findExt);

        file.originalname = req.params.fileId + ext;
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single("userphoto");

exports.upload = function (req, res) {
    var deferred = Q.defer();

    var fileId = req.params.fileId;
    var status = true;

    upload(req, res, function (err, data) {
        if (err) {
            logger.error('ERROR Local storage - Upload img ', err);
            deferred.reject(err);
        }
        folders.updateStatus(fileId, status).then(function (data) {
            deferred.resolve(data);
        })

    });
    return deferred.promise;
};

exports.getUploadURL = function (userId, fileName, fileExt) {
    var deferred = Q.defer();

    folders.saveFile({
        userId: userId,
        filename: fileName,
        ext: fileExt
    }).then(function (saved) {
        deferred.resolve(config.serverURL + '/file/' + saved._id + '/upload');
    }).fail(function (err) {
        logger.error('ERROR Local storage - get URL to upload ', err);
        return deferred.reject(err);
    });

    return deferred.promise;
};

exports.folders = function () {
    var deferred = Q.defer();

    folders.returnAllFolders().then(function (data) {
        deferred.resolve(data);
    }).fail(function (err) {
        logger.error('ERROR Local storage - list all folders ', err);
        return deferred.reject(err);
    });

    return deferred.promise;
};
exports.foldersByUserId = function (userId) {
    var deferred = Q.defer();

    folders.retrunFoldersByUserId(userId).then(function (data) {
        deferred.resolve(data);
    }).fail(function (err) {
        logger.error('ERROR Local storage - list all folders by User Id', err);
        return deferred.reject(err);
    });

    return deferred.promise;
};
exports.files = function (folder) {
    var deferred = Q.defer();

    folders.retrunAllFiles(folder).then(function (data) {

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
                    deferred.resolve(filesData);
                }
            });
        })

    }).fail(function (err) {
        logger.error('ERROR Local storage - list all files', err);
        return deferred.reject(err);
    });

    return deferred.promise;
};
exports.filesByUserId = function (userId, folder) {
    var deferred = Q.defer();

    folders.retrunFilesByUserId(userId, folder).then(function (data) {

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
                    deferred.resolve(filesData);
                }
            });
        });

    }).fail(function (err) {
        logger.error('ERROR Local storage - list all files by User Id', err);
        return deferred.reject(err);
    });

    return deferred.promise;
}

exports.deleteFile = function (userId, fileId) {
    var deferred = Q.defer();

    folders.findById(fileId).then(function (file) {

        if (!file) return deferred.reject('ERROR Local storage - Not Found', err);
        if (file.userId != userId) return deferred.reject('ERROR Local storage -Not Autorized', err);

        fs.unlink(config.file.destination + "/" + file._id + '.' + file.ext, function (err) {
            if (err) {
                logger.error('ERROR Local storage - delete', err);
                return deferred.reject(err);
            } else {
                folders.deleteFileByUser(fileId).then(function (data) {
                    deferred.resolve(data);
                });
            }
        });
    }).fail(function (err) {
        logger.error('ERROR Local storage - delete', err);
        return deferred.reject(err);
    })
    return deferred.promise;
};
exports.deleteFileAdmin = function (fileId) {
    var deferred = Q.defer();

    folders.findById(fileId).then(function (file) {

        if (!file) return deferred.reject('ERROR Local storage - Not Found', err);
        fs.unlink(config.file.destination + "/" + file._id + '.' + file.ext, function (err) {
            if (err) {
                logger.error('ERROR Local storage - delete', err);
                return deferred.reject(err);
            } else {
                folders.deleteFileByUser(fileId).then(function (data) {
                    deferred.resolve(data);
                });
            }
        });
    }).fail(function (err) {
        logger.error('ERROR Local storage - delete', err);
        return deferred.reject(err);
    })
    return deferred.promise;
};