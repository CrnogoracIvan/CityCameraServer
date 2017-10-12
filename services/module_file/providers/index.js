var localStorageProvider = require('./localStorageProvider');
var s3StorageProvider = require('./s3StorageProvider');


var _getProvider = function(){
  if (config.provider == 'local'){
      console.log('Im local',localStorageProvider)
    return localStorageProvider;
  } else {
    console.log('Im s3', s3StorageProvider)
    return s3StorageProvider;
  }
};
module.exports =_getProvider();