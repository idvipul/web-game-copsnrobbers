var express = require('express');
var router = express.Router();
const db = require('../db/index.js');

router.get('/', function(req, res, next) {
	res.render("signin.ejs");
});

module.exports = router;