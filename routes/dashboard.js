var express = require('express');
var router = express.Router();
const db = require('../db/index.js');

router.get('/', function(req, res, next) {
    var myName="Girish";
    res.render("dashboard",{
        "name":myName
    });
});

socket.on('game finished', function(gameId, winnerId, winnerType){
            console.log("in dashboard.js" + winnerId);
          });

module.exports = router;
