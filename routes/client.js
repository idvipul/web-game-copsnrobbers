var express = require('express');
var router = express.Router();
var gameDB = require('createNewGame')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('gameplay', { title: '' });
});

module.exports = router;
