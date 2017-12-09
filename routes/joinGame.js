var express = require('express');
var router = express.Router();
var models = require('../models');
const db = require('../db/index.js');

router.get('/', function(req, res, next) {

//    if (playerRole!=0) {

    db.any('select id from games')
        .then(function (results) {

            // for(var i=0; i= results[]["id"] ;i++ ) {}

//            var gameId = results[i]["id"];

            var gameId = results[0]["id"];

            res.redirect('/game/' + gameId);
        })
        .catch(function (error) {
            console.log('something went wrong' + error);
        });
//    }
});

module.exports = router;