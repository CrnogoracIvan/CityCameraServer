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
router.post('/getUploadURL', controller.getUploadURL);

router.get('/folders', secMidd.checkToken, controller.folders);
router.get('/:folder/files/', secMidd.checkToken, controller.files);
router.delete('/delete', secMidd.checkToken, controller.deleteFile);

module.exports = router;