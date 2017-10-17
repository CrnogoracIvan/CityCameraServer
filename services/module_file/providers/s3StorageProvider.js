// bucket: citycamera
// accessKey: AKIAJM3IPDB7MOYMTXDQ
// secretKey: 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
// region:     eu-central-1


// Read in the file, convert it to base64, store to S3
// fs.readFile('C:/Users/Jelena/Desktop/CityCam/uploads/fol1/marketing.png', function (err, data) {
//     console.log('>>>>',data)
//     if (err) { throw err; }

//     var base64data = new Buffer(data, 'binary');

//     s3.putObject({
//       Bucket: "citycamera",
//       Key:'imgname',
//       Body: base64data,
//       ACL: 'public-read'
//     },function (resp) {
//       console.log(arguments);
//       console.log('Successfully uploaded package.');
//     });

//   });
var express = require("express");
var AWS = require('aws-sdk');
const fs = require("fs"); // from node.js
const path = require("path"); // from node.js
AWS.config.update({
    accessKeyId: 'AKIAJM3IPDB7MOYMTXDQ',
    secretAccessKey: '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',
    region: 'eu-central-1'
});
var s3 = new AWS.S3();
var params = {
    Bucket: 'citycamera'
};
exports.folders = function (callback) {
    var folders = [];
    s3.listBuckets(function (err, data) {
        if (err) {
            return err
        } else {
            data.Buckets.forEach(function (file) {
                folders.push(file.Name)
                return ({
                    folders: folders
                });
            })
            callback(folders);
        }
    });
};
exports.files = function (callback) {

    var files = [];
    s3.listObjects(params, function (err, data) {
        if (err) {
            return err
        } else {
            var bucketContents = data.Contents;
            bucketContents.forEach(function (file, index) {
                var urlParams = {
                    Bucket: 'citycamera',
                    Key: bucketContents[index].Key
                };
                s3.getSignedUrl('getObject', urlParams, function (err, url) {
                    files.push({
                        imgUrl: url,
                        Key: bucketContents[index].Key
                    });
                    if (bucketContents.length - 1 === index) {
                        callback(files);
                    }
                });
            })
        }
    });
};

exports.deleteFile = function (req, res, callback) {
    s3.listObjects(params, function (err, data) {
        if (err) {
            return err
        } else {
            var bucketContents = data.Contents;
            bucketContents.forEach(function (file, index) {
                var urlParams = {
                    Bucket: 'citycamera',
                    Key: bucketContents[index].Key
                };
                s3.deleteObject(urlParams, function (err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else console.log(data); // successful response
                    callback();
                });
            })
        }
    });
};