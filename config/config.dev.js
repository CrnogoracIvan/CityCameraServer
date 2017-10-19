var config = {
  security: {
    secret: 'SOME_RANDOM_STRING'
  },
  "mongodb": {
    "host": "mongodb://localhost:27017/",
    "db": "citycamera_test"
  },
  "file": {
    "destination": "C:/Users/Jelena/Desktop/CityCam/uploads"
  },
  "log": {
    "level": "debug",
    "json": false,
    "logsToFile": true,
    "fileLogParams": {
      "folder": "log",
      "prefix": "city_camera_",
      "datePattern": "yyyy_MM_dd",
      "extension": "log",
      "keepLogsDays": 5
    }
  },
  "provider": "local",
  "aws": {
    "accessKeyId": "AKIAJM3IPDB7MOYMTXDQ",
    "secretAccessKey": "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",
    "region": "eu-central-1"
  },
  "bucketName": "citycamera"
};


module.exports = config;
