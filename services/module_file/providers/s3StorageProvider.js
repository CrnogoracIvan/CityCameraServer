var express = require('express');
var AWS = require('aws-sdk');
var fs = require("fs");
var path = require("path");
var moment = require("moment");

AWS.config.loadFromPath(config.awsCredentials.destination);

var s3 = new AWS.S3({
    signatureVersion: "v4"
});

exports.getUploadURL = function (req, res, callback) {
    var keyByDate = moment().format('MM-DD-h:mm') + '.jpg';
    var options = {
        Bucket: config.bucketName,
        Key: keyByDate,
        Expires: 600, //600 sec
        ContentType: 'multipart/form-data',
        ACL: 'public-read'
    }
    s3.getSignedUrl('putObject', options, function (err, url) {
        s3.getSignedUrl('putObject', options, function (err, url) {
            if (err) {
                return callback(err);
            }
            callback(url);
        })

    })
}
exports.folders = function (callback) {
    var folders = [];
    s3.listBuckets(function (err, data) {
        if (err) {
            return err
        } else {
            data.Buckets.forEach(function (file) {
                if (file.Name == config.bucketName) {
                    folders.push(file.Name)
                }
                return ({
                    folders: folders
                });
            })
            callback(folders);
        }
    });
};
exports.files = function (req, res, next, callback) {
    var params = {
        Bucket: config.bucketName
    };
    var files = [];
    s3.listObjects(params, function (err, data) {
        var filesData = {
            files: files,
            path: null
        };
        if (err) {
            return err;
        } else {
            var bucketContents = data.Contents;
            bucketContents.forEach(function (file, index) {
                var urlParams = {
                    Bucket: config.bucketName,
                    Key: bucketContents[index].Key
                };
                s3.getSignedUrl('getObject', urlParams, function (err, url) {
                    files.push({
                        filename: bucketContents[index].Key,
                        content: url
                    });
                    if (bucketContents.length - 1 === index) {
                        callback(filesData);
                    }
                });
            })
        }
    });
};
exports.deleteFile = function (req, res, callback) {
    var urlParams = {
        Bucket: config.bucketName,
        Key: req.body.file
    };
    s3.deleteObject(urlParams, function (err, data) {
        if (err) {
            return err
        } else {
            callback();
        }
    });
};