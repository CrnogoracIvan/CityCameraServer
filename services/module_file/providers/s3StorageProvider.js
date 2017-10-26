var express = require('express');
var AWS = require('aws-sdk');
var fs = require("fs");
var path = require("path");
var request = require('request');
var moment = require("moment");
//json1
// var awsCredentials = fs.readFileSync(config.awsCredentials.destination);
// var configdata = JSON.parse(awsCredentials);
// AWS.config.update(configdata);

//json2 read from local file
AWS.config.loadFromPath(config.awsCredentials.destination);

var s3 = new AWS.S3({
    region: "eu-central-1",
    signatureVersion: "v4"
});
var params = {
    Bucket: config.bucketName
};

exports.uploadAws = function (req, res, callback) {
    var imgDataName =moment().format("MM_DD h:mm")
    console.log('req.body.file', req.body.file)

    var options = {
        Bucket: config.bucketName,
        Key: imgDataName,
        Expires: 600,//600 sec
        ContentType:  moment().format("YYYY_MM_DD")
        // ContentType: 'multipart/form-data',
        // ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', options, function (err, presigned_url) {
        console.log('......presigned_url', presigned_url)

        s3.getSignedUrl('putObject', options, function (err, presigned_url) {
         
            if (err) {
                return callback(err);
            }
            callback(presigned_url);
        })
        // if (err) {
        //     console.log('AWS.S3().getSignedUrl error' + err);
        // } else {
        //     request({
        //             method: 'PUT',
        //             uri: presigned_url,
        //             body:req.body.file,
        //             headers: {
        //                 'Content-Type': req.body.type
        //             }
        //             //fs.readFileSync('C:/Users/Jelena/Desktop/CityCam/uploads/fol1/dafed4.jpg'),
        //         },
        //         function (error, response, body) {
        //             if (error) {
        //                 console.error(error);
        //             } else {
        //                 console.log('upload successful:', body);

        //             }
        //         });
        //           callback();
        // }
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