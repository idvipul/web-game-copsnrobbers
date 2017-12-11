var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../controllers/authcontroller.js');
const db = require('../db/index.js');

router.get('/:gameId', function (req, res, next) {
     
    // console.log(req.query.playerRole+"------game.js");
    // console.log(req.user.id+"-------game.js");
    // console.log("game ID : "+gameId);
    console.log(req.query.path);
    var Game = models.game;
    var Player = models.player;
    var gameId = req.params.gameId;
    
    var role=req.query.playerRole;
    var userId=req.user.id;
    
    if(req.query.path=="newGame"){

        var playerObj = {
            gameId: gameId,
            userId: req.user.id,
            Xposition: 0,
            Yposition: 0,
            playerRole: req.query.playerRole
        };
    
        Player.create(playerObj).then(plyr=>{
            var pId=plyr.id;
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

    }
console.log("outside if check");
    if(req.query.path=="joinGame"){
        console.log("in join Game path");
        console.log(req.query.playerRole);
        var playerObj = {
            gameId: gameId,
            userId: req.user.id,
            Xposition: 0,
            Yposition: 0,
            playerRole: req.query.playerRole
        };
        Player.create(playerObj).then(plyr=>{
            var pId=plyr.id;
            if(role==1){
                db.any('update games set "copId"='+pId+' where "id"=\''+gameId+'\'');
            }
            if(role==2){
                db.any('update games set "robberId"='+pId+' where "id"=\''+gameId+'\'');
    
            }
            
        });
        
        res.render("createNewGame");
    }


});

module.exports = router;