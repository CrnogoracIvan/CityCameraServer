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
    })

    return deferred.promise;
};

exports.folders = function () {
    var deferred = Q.defer();
    folders.returnAllFolders().then(function (data) {
        deferred.resolve(data);
    }).fail(function (err) {
        logger.error('ERROR Local storage - list all folders ', err);
        return deferred.reject(err);
    })
    return deferred.promise;
};
exports.foldersByUserId = function (userId) {
    var deferred = Q.defer();

    folders.retrunFoldersByUserId(userId).then(function (data) {
        deferred.resolve(data);
    }).fail(function (err) {
        logger.error('ERROR Local storage - list all folders by User Id', err);
        return deferred.reject(err);
    })

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
    })

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
        })

    }).fail(function (err) {
        logger.error('ERROR Local storage - list all files by User Id', err);
        return deferred.reject(err);
    })
    return deferred.promise;
}

exports.deleteFile = function (file, fileId) {
    var deferred = Q.defer();
    fs.unlink(config.file.destination + "/" + file, function (err) {
        if (err) {
            logger.error('ERROR Local storage - delete', err);
            return deferred.reject(err);
        } else {
            folders.deleteFileByUser(fileId).then(function (data) {
                deferred.resolve(data);
            })

        }
    });
    return deferred.promise;
};