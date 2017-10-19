var localStorageProvider = require('./localStorageProvider');
var s3StorageProvider = require('./s3StorageProvider');


var _getProvider = function(){
  if (config.provider == 'local'){
    return localStorageProvider;
  } else {
    return s3StorageProvider;
  }
};
module.exports =_getProvider();