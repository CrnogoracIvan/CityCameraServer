var localStorageProvider = require('./localStorageProvider');
var s3StorageProvider = require('./s3StorageProvider');


var _getProvider = function () {
  if (config.provider == 'local') {
    logger.info('Local Storage Provider');
    return localStorageProvider;
  } else {
    logger.info('S3 Storage Provider');
    return s3StorageProvider;
  }
};
module.exports = _getProvider();