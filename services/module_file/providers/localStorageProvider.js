var express = require("express");
var multer = require("multer"); //is midleware for handling multipart/form-data,(primarily used for uploading files)
var moment = require("moment"); //is js library for parsing, manipulating, validating and formating data
var fs = require("fs");
var path = require("path"); //This module contains utilities for handling and transforming file paths.
var Q = require("q");

/**
 * Creating folder if not exists with date
 *
 * @param  {[type]} req       [description]
 * @param  {[type]} file      [description]
 * @param  {[type]} callback) {                                                                                                                                                                                                 
 * @param  {[type]} filename: function(req, file, callback)
 * @return {[type]}           [description]
 */


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("storage destnation function");
        fs.exists(config.file.destination + "/" + moment().format("YYYY_MM_DD"), function (exists) {
            if (exists) {
                callback(null, config.file.destination + "/" + moment().format("YYYY_MM_DD"));
            } else {
                fs.mkdir(config.file.destination + "/" + moment().format("YYYY_MM_DD"), function (err) {
                    if (err) {
                        console.log("Greska u kreiranju foldera ", err);
                    } else {
                        console.log("uspesno kreirao folder");
                        callback(null, config.file.destination + "/" + moment().format("YYYY_MM_DD"));
                    }
                });
            }
        });
    },

    filename: function (req, file, callback) {
        // console.log("file za upload je", file.originalname);
        callback(null, file.originalname);
    }
});
// **** end of creating folder **** //

var upload = multer({
    storage: storage
}).single("userphoto"); // .single smesta file  fo

exports.upload = function () {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.", err);
        }
        res.end("File is uploaded");
    });
};

exports.folders = function () {
 
    var deferred = Q.defer();
    console.log('usao sam u local storage folders', deferred);
    var folders = [];

    fs.readdir(config.file.destination, function (err, files) {
        if (err) {
            deferred.reject(new Error(error))
        }
        //return empty list
        if (files.length === 0) {
                deferred.resolve( { 
                   folders: folders
                });
        } else {
            files.map(function (file) { // map() funckija kreira novi niz
                return path.join(config.file.destination, file); //path.join() pravi putanju, odnosno spaja putanjau od onoga sto joj prosledimo
            }).filter(function (file) {
                return fs.statSync(file).isDirectory();
            }).forEach(function (file, index, list) {
                file = path.basename(file);
                folders.push(file);

                if (index == list.length - 1) {
                    console.log('zavrsio sam sam u local strat folders2', folders)
                        deferred.resolve( { 
                           folders: folders
                        });
                }
            });
        }
       
    });
    return deffered.promise;
};
