var controller = require('./controller');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var secMidd = require('../../middleware/securityMiddleware');

router.post('/:userId/upload', controller.upload);
router.post('/:userId/getUploadURL', controller.getUploadURL);

router.get('/folders', secMidd.checkTokenUser, controller.folders);
router.get('/folders/:id', secMidd.checkTokenUser, controller.foldersByUserId);
router.get('/:folder/files/', secMidd.checkTokenUser, controller.files);
router.get('/:id/:folder/files/', secMidd.checkTokenUser, controller.filesByUserId);
router.delete('/delete/:id', secMidd.checkTokenUser, controller.deleteFile);
module.exports = router;