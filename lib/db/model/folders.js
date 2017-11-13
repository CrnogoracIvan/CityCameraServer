var Q = require('q');
var Folders = require('../schema/folders');
var error = require('../../error').error;

exports.saveFile = function (data) {
    console.log('======models save start=========')
    console.log('models save', data)
    var deferred = Q.defer();
    var folder = new Folders(data);
    folder.save(function (err, folder) {
        if (err) {
            console.log('err', err);
            return deferred.reject(error('INTERNAL_ERROR'));
        }
        deferred.resolve(folder);
    });
    return deferred.promise;
}
exports.returnAllFolders = function (callback) {
    var folders = [];
    Folders.find(function (err, data) {

        if (err) {
            return callback(error('INTERNAL_ERROR'));
        }
        data.forEach(function (data, i) {
            if (folders.indexOf(data.folder) == -1) {
                folders.push(data.folder)
                //folders.push(data)
            }

            return ({
                folders: folders
            });
        });
        console.log('AllFolders', folders)
        callback(null, folders);
    });
};

exports.retrunFoldersByUserId = function (userId) {

    var foldersList = [];
    var deferred = Q.defer();
    Folders.find({
        userId: userId
    }, function (err, folders) {

        if (err) {
            return deferred.reject(err);
        }
        folders.forEach(function (data, i) {
            if (foldersList.indexOf(data.folder) == -1) {
                foldersList.push(data.folder)
            }
        });
        deferred.resolve(foldersList);
        console.log('Folders by ID', foldersList)
    });
    return deferred.promise;
}
exports.retrunAllFiles = function (folder) {
    var deferred = Q.defer();
    Folders.find({
        folder: folder
    }, function (err, data) {
        console.log('All files', data);
        var filesData = {
            files: data,
            path: null
        };
        if (err) {
            return deferred.reject(err);
        }
        deferred.resolve(filesData);
        console.log('All files resolveed', filesData)
    });
    return deferred.promise;
}
exports.retrunFilesByUserId = function (userId, folder) {
    var deferred = Q.defer();
    Folders.find({
        userId: userId,
        folder: folder
    }, function (err, files) {
        console.log('files by id', files)
        var filesData = {
            files:  files,
            path: null
        };
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(filesData);
        console.log('files by ID resolved',filesData)
    })
    return deferred.promise;
}

exports.delete = function(){
  
}