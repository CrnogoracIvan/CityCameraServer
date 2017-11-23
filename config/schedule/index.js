var Q = require('q');
var schedule = require('node-schedule');
var Folders = require('../../lib/db/schema/folders');
var error = require('../../lib/error').error;

exports.start = function(){
    schedule.scheduleJob('59 * * * * ', checkDatabase);
}

var checkDatabase = function(){
            Folders.find({
            status: false
        }, function (err, filesStatusFalse) {

            var currentDate = new Date();

            filesStatusFalse.forEach(function (files) {

                var dbDate = files.updated;

                var diff = (currentDate - dbDate) / 60e3;
                //60e3 minute
                ///1e3 sekunde
                console.log('diff', diff);

                if (diff > 60) {
                    Folders.remove({
                        _id: files._id
                    }, function (err) {
                        if (err) {
                            logger.error('ERROR DB - Deleting Files with status = false', err);
                        }
                    });

                }
            });
        });
}