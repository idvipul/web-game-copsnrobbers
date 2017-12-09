var express = require('express');
var router = express.Router();
var models = require('../models');
const db = require('../db/index.js');

router.get('/', function(req, res, next) {

    db.any('select id from games')
        .then(function (results) {

            var gameId = results[0]["id"];

           res.redirect('/game/' + gameId);
        })
        .catch(function (error) {
            console.log('something went wrong' + error);
        });
});

module.exports = router;