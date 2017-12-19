var express = require('express');
var router = express.Router();
const db = require('../db/index.js');
var crypto = require('crypto');
const url=require('url');
function randomValueHex(len) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
}

router.post('/', function (req, res, next) {
    var value = randomValueHex(6);
    console.log("--------------value generated--------"+value);
    var role=req.body.playerRole;
    var path="newGame";
    const gameId = value;
    console.log("before redirecting to game.js");
    res.redirect(url.format({
        pathname:"/game/"+gameId,
        query:{
            "playerRole":role,
            "user":req.user,
            "path":path
        }
    }));
});
module.exports = router;