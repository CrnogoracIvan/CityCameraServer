var express = require('express');
var AWS = require('aws-sdk');
var fs = require("fs");
var path = require("path");
var request = require('request');
var moment = require("moment");
var multer = require("multer");
var multerS3 = require("multer-s3");
//json1
// var awsCredentials = fs.readFileSync(config.awsCredentials.destination);
// var configdata = JSON.parse(awsCredentials);
// AWS.config.update(configdata);

//json2 read from local file
AWS.config.loadFromPath(config.awsCredentials.destination);

var s3 = new AWS.S3({
    signatureVersion: "v4"
});
var uploadAws = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.bucketName,
        key: function (req, file, cb) {
           // console.log(file);
            cb(null, file.originalname);
        }
    })
}).array('userphoto', 1);

exports.uploadAws = function (req, res, callback) {
    //Upload to AWS with Multer S3
    uploadAws(req, res, function (err) {
        if (err) {
            console.log('errr', err)
            return err;
        }
        callback();
    });

}
exports.getPresignedUrl = function (req, res, callback) {
    var imgDataName = moment().format("MM_DD h:mm");
    // console.log('req.body.file', req.body.file)
    var options = {
        Bucket: config.bucketName,
        Key: imgDataName, // or req.body.file for POST
        Expires: 600, //600 sec
    }
    s3.getSignedUrl('putObject', options, function (err, presigned_url) {
        //console.log('presigned_url>>>>>>>>>>>>>', presigned_url)
        s3.getSignedUrl('putObject', options, function (err, presigned_url) {

            if (err) {
                return callback(err);
            }
            callback(presigned_url);
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
    //console.log('req.body.file', req.body.file);
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