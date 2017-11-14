var express = require("express");
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
exports.getUploadURL = function (req, res, callback) {
    var fileName = req.body.file;
    var fileExt = req.body.ext;
    console.log('storage', req.body.file, req.body.ext)
    folders.saveFile({
        userId: req.params.userId,
        filename: fileName,
        ext: fileExt
    }).then(function (saved) {
        console.log('savedddddddd', saved)
        callback(null, config.serverURL + '/file/' + saved._id + '/upload');
    })

};
exports.folders = function (callback) {
    folders.returnAllFolders(function (err, data) {
        if (err) return err;
        //   console.log('lista svih foldersa folder locall/', data)
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
    folders.retrunAllFiles(req.params.folder).then(function (data) {

        var test = data.files;

        console.log(' test var', data);
        var listAllFiles = [];
        test.forEach(function (fileLoc, index, list) {
            //  console.log(' >>>>>', fileLoc);

            fs.readFile(config.file.destination + "/" + fileLoc._id + '.' + fileLoc.ext, "base64", function (err, content) {
                //   console.log(' >>>>>22', config.file.destination + "/" + fileLoc._id + '.' + fileLoc.ext)
                var filesData = {
                    files: listAllFiles,
                    path: "file/" + fileLoc._id + '.' + fileLoc.ext + "/file"
                };
                listAllFiles.push({
                    content: content,
                    filename: fileLoc.filename + '.' + fileLoc.ext
                })

                if (listAllFiles.length - 1 === list.length - 1) {

                    callback(null, filesData)
                }

            });


        })

    })
};
exports.filesByUserId = function (req, res, next, callback) {
    console.log('id and folder', req.params.folder, req.params.id);
    try {
        folders.retrunFilesByUserId(req.params.id, req.params.folder).then(function (data) {
            console.log('list files by user ID ', data)
            //   callback(null, data);

            var test = data.files;

            console.log(' test var', data);
            var listAllFiles = [];
            test.forEach(function (fileLoc, index, list) {
                //  console.log(' >>>>>', fileLoc);

                fs.readFile(config.file.destination + "/" + fileLoc._id + '.' + fileLoc.ext, "base64", function (err, content) {
                    //   console.log(' >>>>>22', config.file.destination + "/" + fileLoc._id + '.' + fileLoc.ext)
                    var filesData = {
                        files: listAllFiles,
                        path: "file/" + fileLoc._id + '.' + fileLoc.ext + "/file"
                    };
                    listAllFiles.push({
                        content: content,
                        filename: fileLoc.filename + '.' + fileLoc.ext
                    })
                    if (listAllFiles.length - 1 === list.length - 1) {
                        callback(null, filesData)
                    }
                });
            })

        }).fail(function (err) {
            console.log('greska1', err)
            return callback(err);
        })
    } catch (e) {
        console.log('greska2', e)
    };
}

exports.deleteFile = function (req, res, callback) {
    fs.unlink(config.file.destination + "/" + req.body.file, function (err) {
        if (err) {
            next(err);
        }
        callback();
    });

};