var controller = require('./controller');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var secMidd = require('../../middleware/securityMiddleware');

router.post('/:fileId/upload', controller.upload);
router.post('/:userId/getUploadURL', controller.getUploadURL);

router.get('/folders', secMidd.checkTokenUser, controller.folders);
router.get('/folders/:id', secMidd.checkTokenUser, controller.foldersByUserId);
router.get('/:folder/files/', secMidd.checkTokenUser, controller.files);
router.get('/:id/:folder/files/', secMidd.checkTokenUser, controller.filesByUserId);
router.delete('/:userId/delete/:fileId', secMidd.checkTokenUser, controller.deleteFile);
router.delete('/delete/:fileId', secMidd.checkTokenAdmin, controller.adminDeleteFile);
module.exports = router;