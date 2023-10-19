var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/path', function (req, res, next) {
  res.send(__dirname);
})

module.exports = router;
