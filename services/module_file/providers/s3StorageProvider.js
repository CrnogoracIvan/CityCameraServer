var express = require('express');
var Q = require('q');
var AWS = require('aws-sdk');
var fs = require("fs");
var path = require("path");
var moment = require("moment");
var folders = require('../../../lib/db/model/folders');
AWS.config.loadFromPath(config.awsCredentials.destination);

var s3 = new AWS.S3({
    signatureVersion: "v4"
});

exports.getUploadURL = function (userId, fileName, fileExt) {
    var deferred = Q.defer();

    folders.saveFile({
        userId: userId,
        filename: fileName,
        ext: fileExt
    }).then(function (saved) {

        var options = {
            Bucket: config.bucketName,
            Key: saved._id + '.' + fileExt,
            Expires: 600, //600 sec
            ContentType: 'multipart/form-data',
            ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', options, function (err, url) {
            if (err) {
                logger.error('ERROR S3 storage - get Signed Url', err);
                return deferred.reject(err);
            }
            deferred.resolve({
                url: url
            });
        });
    }).fail(function (err) {
        logger.error('ERROR S3 storage - get URL to upload and save to DB', err);
        return deferred.reject(err);
    });
    return deferred.promise;
};
exports.folders = function () {
    var deferred = Q.defer();

    folders.returnAllFolders().then(function (data) {
        deferred.resolve(data);
    }).fail(function (err) {
        logger.error('ERROR S3 storage - list all folders ', err);
        return deferred.reject(err);
    });

    return deferred.promise;
};
exports.foldersByUserId = function (userId) {
    var deferred = Q.defer();

    folders.retrunFoldersByUserId(userId).then(function (data) {
        deferred.resolve(data);
    }).fail(function (err) {
        logger.error('ERROR S3 storage - list all folders by User Id', err);
        return deferred.reject(err);
    });

    return deferred.promise;
};

exports.files = function (folder) {
    var deferred = Q.defer();

    folders.retrunAllFiles(folder).then(function (data) {
        deferred.resolve(data);
    }).fail(function (err) {
        logger.error('ERROR S3 storage - list all files', err);
        return deferred.reject(err);
    });

    return deferred.promise;
}
exports.filesByUserId = function (userId, folder) {
    var deferred = Q.defer();

    folders.retrunFilesByUserId(userId, folder).then(function (data) {
        deferred.resolve(data);
    }).fail(function (err) {
        logger.error('ERROR S3 storage - list all files by User ID', err);
        return deferred.reject(err);
    });

    return deferred.promise;
}

exports.deleteFile = function (userId, fileId) {
    var deferred = Q.defer();

    folders.findById(fileId).then(function (file) {

        var urlParams = {
            Bucket: config.bucketName,
            Key: file._id + '.' + file.ext
        };

        if (!file) return deferred.reject('ERROR Local storage - Not Found', err);
        if (file.userId != userId) return deferred.reject('ERROR Local storage -Not Autorized', err);

        s3.deleteObject(urlParams, function (err, data) {
            if (err) {
                logger.error('ERROR S3 storage - delete', err);
                return deferred.reject(err);
            } else {
                folders.deleteFileByUser(fileId).then(function (data) {
                    deferred.resolve(data);
                });
            }
        });
    }).fail(function (err) {
        logger.error('ERROR S3 storage - delete', err);
        return deferred.reject(err);
    })
    return deferred.promise;
};