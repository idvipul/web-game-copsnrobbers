var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../controllers/authcontroller.js');
const db = require('../db/index.js');

router.get('/:gameId', function (req, res, next) {

    var gameId = req.params.gameId;
    var Game = models.game;
    var pId;
    var Player = models.player;

console.log(req.query.playerRole+"------game.js");
console.log(req.user.id+"-------game.js");
console.log("game ID : "+gameId);
var role=req.query.playerRole; 
var userId=req.user.id;   
var playerObj = {
        gameId: gameId,
        userId: req.user.id,
        Xposition: 0,
        Yposition: 0,
        playerRole: req.query.playerRole
    };

    Player.create(playerObj).then(plyr=>{
        pId=plyr.id;
        console.log(pId);
        if(role==1){
            console.log("role is 1");
            var gameObj =
            {
                id: gameId,
                copId:pId
            };
        }
        if(role==2){
            console.log("role is 2");
            var gameObj =
            {
                id: gameId,
                robberId:pId
            };
        }
            Game.create(gameObj);
    });

   res.render("createNewGame");
    });

module.exports = router;