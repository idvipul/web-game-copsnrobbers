var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../controllers/authcontroller.js');
const db = require('../db/index.js');

router.get('/:gameId', function (req, res, next) {
    var Game = models.game;
    var Player = models.player;
    var gameId = req.params.gameId;
    let pId;
    var role = req.query.playerRole;
    var userId = req.user.id;
    var userAlias = req.user.alias;
    if (req.query.path == "newGame") {
        var playerObj = {
            gameId: gameId,
            userId: req.user.id,
            Xposition: 0,
            Yposition: 0,
            playerRole: req.query.playerRole
        };

        Player.create(playerObj).then(plyr => {
            pId = plyr.id;
            if (role == 1) {
                console.log("role is 1");
                var gameObj =
                    {
                        id: gameId,
                        copId: pId
                    };
            }
            if (role == 2) {
                console.log("role is 2");
                var gameObj =
                    {
                        id: gameId,
                        robberId: pId
                    };
            }
            db.any('select * from players where "id"=' + pId)
                .then(function (p) {
                    Game.create(gameObj);
                    res.render("createNewGame", {
                        "gameid": gameId,
                        "playerid": pId,
                        "player": p,
                        "user": userAlias
                    });
                })

        });
    }

    if (req.query.path == "joinGame") {
        var playerObj = {
            gameId: gameId,
            userId: req.user.id,
            Xposition: 0,
            Yposition: 0,
            playerRole: req.query.playerRole
        };
        Player.create(playerObj).then(plyr => {
            pId = plyr.id;
            if (role == 1) {
                db.any('update games set "copId"=' + pId + ' where "id"=\'' + gameId + '\'');
            }
            if (role == 2) {
                db.any('update games set "robberId"=' + pId + ' where "id"=\'' + gameId + '\'');

            }
            db.any('select * from players where "id"=' + pId)
                .then(function (p) {
                    res.render("createNewGame", {
                        "gameid": gameId,
                        "playerid": pId,
                        "player": p,
                        "user": userAlias
                    });
                })
        });
    }
});

module.exports = router;