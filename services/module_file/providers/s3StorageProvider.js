var express = require('express');
var AWS = require('aws-sdk');
const fs = require("fs");
const path = require("path");
AWS.config.update(config.aws);
var s3 = new AWS.S3();
var params = {
    Bucket: config.bucketName
};
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
    console.log('req.body.file', req.body.file);
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

// fs.readFile('C:/Users/Jelena/Desktop/CityCam/uploads/fol1/middleLogo1.png', function (err, data) {
//     console.log('>>>>', data)
//     if (err) {
//         throw err;
//     }
//     var base64data = new Buffer(data, 'binary');
//     s3.putObject({
//         Bucket: 'citycamera',
//         Key: 'middleLogo1.png',
//         Body: base64data,
//         ACL: 'public-read',

//     }, function (resp) {
//         console.log(arguments);
//         console.log('Successfully uploaded package.');
//     });
// });