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
    var folder = moment().format('YYYY-MM-DD') + '/';
    var fileName = req.body.file;
    var fileExt = req.body.ext;

    try {
        folders.saveFile({
            userId: req.params.userId,
            filename: fileName + '.' + fileExt
        }).then(function (saved) {
            var options = {
                Bucket: config.bucketName,
                Key: folder + saved._id + '.' + fileExt,
                Expires: 600, //600 sec
                ContentType: 'multipart/form-data',
                ACL: 'public-read'
            };
            console.log('options', options);
            s3.getSignedUrl('putObject', options, function (err, url) {
                if (err) {
                    return callback(err);
                }
                callback(null, {
                    url: url
                });
            });
        }).fail(function (err) {
            console.log('error', err);
        })
    } catch (e) {
        console.log('err', e)
    }

};
exports.folders = function (callback) {
    folders.returnAllFolders(function (err, data) {
        if (err) return err;
        console.log('lista svih foldersa folder/', data)
        callback(null, data);
    })

};
exports.foldersByUserId = function (req, res, callback) {
    console.log('req.params.id', req.params.id)
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

exports.files = function (req, res, next, callback) {

    console.log('req.params.folder s3 usao', req.params.folder)
    try {
        folders.retrunAllFiles(req.params.folder).then(function (data) {
            console.log(' Lista svih fajlova', data)
            callback(null, data);

        }).fail(function (err) {
            console.log('greska1', err)
            return callback(err);
        })
    } catch (e) {
        console.log('greska2', e)
    };
}
exports.filesByUserId = function (req, res, next, callback) {

    console.log('id and folder', req.params.folder,req.params.id);
    try {
        folders.retrunFilesByUserId(req.params.id,req.params.folder).then(function (data) {
            console.log('list files by user ID ', data)
            callback(null, data);

        }).fail(function (err) {
            console.log('greska1', err)
            return callback(err);
        })
    } catch (e) {
        console.log('greska2', e)
    };
}

exports.deleteFile = function (req, res, callback) {
console.log('delete s3 storage', req.params.id);
    try {
        folders.deleteFileByUser(req.params.id).then(function (data) {
            callback(null, data);

        }).fail(function (err) {
            console.log('greska1', err)
            return callback(err);
        })
    } catch (e) {
        console.log('greska2', e)
    };
};
// exports.folders = function (callback) {
//     var params = {
//         Bucket: config.bucketName
//     };
//     var folders = [];
//     s3.listObjects(params, function (err, data) {
//         if (err) {
//             return err;
//         } else {
//             var bucketContents = data.Contents;

//             bucketContents.forEach(function (file, index) {

//                 var test = bucketContents[index].Key;
//                 var key = test.substring(0, test.indexOf('/'));

//                 if (key !== "" && folders.indexOf(key) === -1) {
//                     folders.push(key);
//                 }

//                 return ({
//                     folders: folders
//                 });
//             })
//             callback(null, folders);
//         }
//     });

// };
// exports.files = function (req, res, next, callback) {

//     var params = {
//         Bucket: config.bucketName
//     };
//     var files = [];
//     s3.listObjects(params, function (err, data) {
//         var filesData = {
//             files: files,
//             path: null
//         };
//         if (err) {
//             return err;
//         } else {
//             var bucketContents = data.Contents;

//             bucketContents.forEach(function (file, index) {

//                 var urlParams = {
//                     Bucket: config.bucketName,
//                     Key: bucketContents[index].Key
//                 };
//                 s3.getSignedUrl('getObject', urlParams, function (err, url) {

//                     files.push({
//                         filename: bucketContents[index].Key,
//                         content: url
//                     });

//                     if (bucketContents.length - 1 === index) {
//                         callback(null, filesData);
//                     }
//                 });
//             })
//         }
//     });
// };

// exports.deleteFile = function (req, res, callback) {
//     var urlParams = {
//         Bucket: config.bucketName,
//         Key: req.body.file
//     };
//     s3.deleteObject(urlParams, function (err, data) {
//         if (err) {
//             return err;
//         } else {
//             callback();
//         }
//     });
// };