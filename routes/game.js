var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../controllers/authcontroller.js');

router.get('/:gameId', function (req, res, next) {

    var gameId = req.params.gameId;
    var Game = models.game;
    var Player = models.player;

    var gameObj =
        {
            id: gameId
        };

    var playerObj = {
        gameId: gameId,
        userId: req.user.id,
        Xposition: 0,
        Yposition: 0,
        playerRole: 0
    };

    Game.create(gameObj);
    Player.create(playerObj);

    res.render("createNewGame");
});

module.exports = router;