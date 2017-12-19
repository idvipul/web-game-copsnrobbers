var express = require('express');
var router = express.Router();
var models = require('../models');
const db = require('../db/index.js');
const url = require('url');

router.post('/', function (req, res, next) {
    var gId = req.body.joinGame;
    db.any('select * from games where "id"=\'' + gId + '\'')
        .then(function (gameList) {
            if (gameList[0]["copId"] == null) {
                var role = 1;
            }
            if (gameList[0]["robberId"] == null) {
                var role = 2;
            }
            var path = "joinGame";
            res.redirect(url.format({
                pathname: "/game/" + gId,
                query: {
                    "playerRole": role,
                    "user": req.user,
                    "path": path
                }
            }));
        })
});

module.exports = router;