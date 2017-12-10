var express = require('express');
var router = express.Router();
var models = require('../models');
const db = require('../db/index.js');
const url=require('url');

router.post('/', function(req, res, next) {
    var gId=req.body.joinGame;
    console.log(gId);

    db.any('select * from games where "id"=\''+gId+'\'')
    .then(function(gameList){
        console.log("ONLY GAME ID : "+gameList[0]["id"]);
        if(gameList[0]["copId"] == null){
            var role=1;
        }
        if(gameList[0]["robberId"] == null){
            var role=2;
        }
        var path="joinGame";
        res.redirect(url.format({
            pathname:"/game/"+gId,
            query:{
                //"gameId":gId,
                "playerRole":role,
                "user":req.user,
                "path":path
            }
        }));
    })

//    if (playerRole!=0) {
// var gameid=req.params.gameId;
// console.log("joinGame.js----------------"+gameid);
//     db.any('select id from games')
//         .then(function (results) {

//             // for(var i=0; i= results[]["id"] ;i++ ) {}

// //            var gameId = results[i]["id"];

//             var gameId = results[0]["id"];

//             res.redirect('/game/' + gameId);
//         })
//         .catch(function (error) {
//             console.log('something went wrong' + error);
//         });
//    }




});

module.exports = router;