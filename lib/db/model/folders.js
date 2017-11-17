var Q = require('q');
var Folders = require('../schema/folders');
var error = require('../../error').error;

exports.saveFile = function (data) {
    var deferred = Q.defer();

    var folder = new Folders(data);

    folder.save(function (err, folder) {
        if (err) {
            logger.error('ERROR DB - saving file to DB ', err);
            return deferred.reject(error('MONGO_ERROR'));
        }
        deferred.resolve(folder);
    });

    return deferred.promise;
}

exports.returnAllFolders = function () {
    var deferred = Q.defer();

    Folders.distinct('folder', {
        status: true
    }, function (err, folders) {
        if (err) {
            logger.error('ERROR DB - returning All Folders ', err);
            return deferred.reject(error('MONGO_ERROR'));
        }
        deferred.resolve(folders);
    });

    return deferred.promise;
};

exports.retrunFoldersByUserId = function (userId) {
    var deferred = Q.defer();

    Folders.distinct('folder', {
        userId: userId,
        status: true
    }, function (err, folders) {
        if (err) {
            logger.error('ERROR DB - returning Folders with user id: ' + userId, err);
            return deferred.reject(error('MONGO_ERROR'));
        }
        deferred.resolve(folders);
    });

    return deferred.promise;
}

exports.retrunAllFiles = function (folder) {
    var deferred = Q.defer();

    Folders.find({
        folder: folder,
        status: true
    }, function (err, data) {

        var filesData = {
            files: data,
            path: null
        };
        if (err) {
            logger.error('ERROR DB - returning All Files', err);
            return deferred.reject(error('MONGO_ERROR'));
        }
        deferred.resolve(filesData);
    });

    return deferred.promise;
}

exports.retrunFilesByUserId = function (userId, folder) {
    var deferred = Q.defer();

    Folders.find({
        userId: userId,
        folder: folder,
        status: true
    }, function (err, files) {

        var filesData = {
            files: files,
            path: null
        };
        if (err) {
            logger.error('ERROR DB - returning  files by User ID', err);
            return deferred.reject(err);
        }
        deferred.resolve(filesData);
    });

    return deferred.promise;
}

exports.deleteFileByUser = function (fileId) {
    var deferred = Q.defer();

    Folders.remove({
        _id: fileId
    }, function (err, files) {
        if (err) {
            logger.error('ERROR DB - Deleting Files', err);
            return deferred.reject(error('MONGO_ERROR'));
        }
        deferred.resolve(files);
    });

    return deferred.promise;
}

exports.updateStatus = function (id, status) {
    var deferred = Q.defer();

    Folders.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            status: status,
            new: true
        }
    }, function (err, folder) {
        console.log('update ', folder);
        if (err) {
            logger.error('ERROR saving updated users to DB ', err)
            return deferred.reject(error('MONGO_ERROR'));
        }
        deferred.resolve(folder);
    });

    return deferred.promise;
}
