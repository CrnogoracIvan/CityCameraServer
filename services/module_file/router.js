var controller = require('./controller');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var secMidd = require('../../middleware/securityMiddleware');

/**
 * @api {post} file/upload Test doc example
 * @apiVersion 0.3.0
 * @apiName upload
 * @apiGroup File
 * @apiDescription testiramo dokumentaciju
 *
 * @apiParam (body) {byte[]} file stream
 *
 * @apiError error Internal server error.
 *
 * @apiSampleRequest /file/upload
 *
 * @apiParamExample {json} Request-Example:
 {
    "file" : "sarw@#$#df3w234@#$@"
 }
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200
 {
    "isSuccess" : "true"
 }
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200
 {
    "isSuccess" : "false"
 }
 *
 */
router.post('/upload', controller.upload);

/**
 * @api {post} file/getUploadURL Get Upload URL
 * @apiVersion 0.3.0
 * @apiName getUploadURL
 * @apiGroup File
 * @apiDescription return the URL for image upload
 *
 * @apiParam (body) {String} fileName Name of the File
 * @apiParam (body) {String} fileExt File extension
 *
 * @apiError error Internal server error.
 *
 * @apiSampleRequest /file/getUploadURL
 *
 * @apiParamExample {json} Request-Example:
 {
    "fileName" : "some_file",
    "fileExt" : "jpg"
 }
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200
 {
    {"url" : "upload url"}
 }
 *
 */
router.post('/:userId/getUploadURL', controller.getUploadURL);

router.get('/folders', secMidd.checkTokenUser, controller.folders);
router.get('/folders/:id', secMidd.checkTokenUser, controller.foldersByUserId);
router.get('/:folder/files/', secMidd.checkTokenUser, controller.files);
router.get('/:id/:folder/files/', secMidd.checkTokenUser, controller.filesByUserId);
router.delete('/delete/:id', secMidd.checkTokenUser, controller.deleteFile);

module.exports = router;