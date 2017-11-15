var express = require('express');
var AWS = require('aws-sdk');
var fs = require("fs");
var path = require("path");
var moment = require("moment");
var folders = require('../../../lib/db/model/folders');
AWS.config.loadFromPath(config.awsCredentials.destination);

var s3 = new AWS.S3({
    signatureVersion: "v4"
});

exports.getUploadURL = function (req, res, callback) {

    var fileName = req.body.file;
    var fileExt = req.body.ext;

    try {
        folders.saveFile({
            userId: req.params.userId,
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
                    return callback(err);
                }
                callback(null, {
                    url: url
                });
            });
        }).fail(function (err) {
            return callback(err);
        })
    } catch (e) {
        return err;
    }

};
exports.folders = function (callback) {
    folders.returnAllFolders(function (err, data) {
        if (err) {
            return err;
        };
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
    try {
        folders.retrunAllFiles(req.params.folder).then(function (data) {

            callback(null, data);

        }).fail(function (err) {
            return callback(err);
        })
    } catch (e) {
        console.log('greska2', e);
    };
}
exports.filesByUserId = function (req, res, callback) {

    try {
        folders.retrunFilesByUserId(req.params.id, req.params.folder).then(function (data) {

            callback(null, data);

        }).fail(function (err) {

            return callback(err);
        })
    } catch (e) {
        console.log('greska2', e)
    };
}

exports.deleteFile = function (req, res, callback) {
    var urlParams = {
        Bucket: config.bucketName,
        Key: req.body.file
    };

    s3.deleteObject(urlParams, function (err, data) {
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