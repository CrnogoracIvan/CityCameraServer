var controller = require('./controller');
var express = require('express');
var secMidd = require('../../middleware/securityMiddleware');
var router = express.Router();




router.post('/register',controller.register);
router.post('/login',controller.login);
router.get('/list',secMidd.checkTokenAdmin, controller.listAllUsers);
router.put('/:user_id',secMidd.checkTokenAdmin, controller.updateUser);
module.exports = router;