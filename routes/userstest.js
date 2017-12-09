var express = require('express');
var router = express.Router();
const db = require('../db/index.js');

router.get('/', function(req, res, next) {
    db.any('select * from users')
    .then(function (results) {
        res.json(results);
        console.log(results);
    })
    .catch(function (error) {
        console.log('something went wrong' + error);
    });

});

module.exports = router;