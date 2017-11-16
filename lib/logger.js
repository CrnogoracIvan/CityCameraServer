var winston = require("winston");
var config  = require("../config/");
var fse     = require('fs-extra');
var moment  = require('moment');

var folder = config.log.fileLogParams.folder || 'log/';
if (folder.lastIndexOf('/') != folder.length - 1) {
  folder = folder + '/';
}
if (folder.substr(0, 1) != '/') {
  folder = __dirname.substr(0, __dirname.length - 4) + '/' + folder;
}

fse.ensureDirSync(folder);

var customLevels = {
  levels: {
    debug: 0,
    info: 1,
    warning: 2,
    error: 3
  },
  colors: {
    debug: "green",
    info: "blue",
    warning: "yellow",
    error: "red"
  }
};

winston.addColors(customLevels.colors);

var transports = [
  new (winston.transports.Console)({
    level: "debug",
    levels: customLevels.levels,
    timestamp: true,
    colorize: true
  })
];

if (process.env.NODE_ENV != 'dev') {

  if (config.log.logsToFile) {
    var options = {
        name: "file#logs",
        filename: folder + config.log.fileLogParams.prefix,
        level: config.log.level || "info",
        levels: customLevels.levels,
        timestamp: true,
        json: config.log.json,
        datePattern: config.log.fileLogParams.datePattern + '.' + config.log.fileLogParams.extension
    };
    if (config.log.keepLogsDays > 0) {
      options.maxFiles = config.log.fileLogParams.keepLogsDays;
    }
    transports.push(new winston.transports.DailyRotateFile(options));
  }
}

var logger = new (winston.Logger)({
  transports: transports,
  levels: customLevels.levels
});

//checkLoggedFiles();

logger.checkLoggedFiles = function () {
  if (config.log.fileLogParams.keepLogsDays > 0) {
    var dateFormated = moment(new Date()).subtract(config.log.fileLogParams.keepLogsDays, 'days').format(config.log.fileLogParams.datePattern.toUpperCase());
    var minFileName  = config.log.fileLogParams.prefix + dateFormated + '.' + config.log.fileLogParams.extension;
    this.info('Deleting all log files older or equalt to - ' + minFileName);
    fse.readdirSync(folder).forEach(function (dir) {
      if (fse.lstatSync(folder + dir).isFile()) {
        if (dir <= minFileName) {
          fse.unlinkSync(folder + dir);
        }
      }
    });
  }
};
module.exports = logger;
