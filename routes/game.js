var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../controllers/authcontroller.js');
const db = require('../db/index.js');

router.get('/:gameId', function (req, res, next) {

    var gameId = req.params.gameId;
    var Game = models.game;

    var Player = models.player;
//    var Xposition = ;
//    var Yposition = ;
//    var playerRole= ;
    // var gameObj =
    //     {
    //         id: gameId
    //     };
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

    Player.create(playerObj);
    
    db.any('select * from players where "gameId"='+gameId)
    .then(function(result){
        pId=id[0]["id"];
        console.log("Result : "+result);
    });

    // Player.findOne({ where: {'gameId':gameId} }).then(plyr => {
    //     var pId=plyr.id;
    //     console.log("player ID : "+pId);
    // })

    
    //console.log("player ID : "+);
if(role==1){
    console.log("role is 1");
    var gameObj =
    {
        id: gameId,
        //copId:
    };
}
if(role==2){
    console.log("role is 2");
    var gameObj =
    {
        id: gameId
        //robberId:
    };
}
    Game.create(gameObj);
    

//    res.json(req.body.playerRole);

   res.render("createNewGame");
    });

module.exports = router;