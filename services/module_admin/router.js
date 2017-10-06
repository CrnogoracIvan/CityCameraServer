var controller = require('./controller');
var express    = require('express');
var router     = express.Router();

router.post('/register', function(req, res, next) {
  controller.register(req, res, function(err) {

    if (err) {
      return next(err);
    }
    res.status(200);
    res.json({isSucces: true});
  })
});
/* GET /todos listing. */
router.get('/register', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);

  });
});
router.post('/login', function(req, res, next) {
  controller.login(req, res, function(err, data) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json({isSucces: true, data: data});
  })
});

module.exports = router;