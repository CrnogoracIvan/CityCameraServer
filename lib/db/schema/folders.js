var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require("moment");

var folders = new Schema({
    folder: {
        type: String,
        required: true,
        default: moment().format('YYYY-MM-DD')
    },
    userId: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default:0
    }
});

var Folders = mongoose.model('Folders', folders);
module.exports = Folders;