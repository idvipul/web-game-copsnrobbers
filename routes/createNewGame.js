var express = require('express');
var router = express.Router();
const db = require('../db/index.js');
var crypto = require('crypto');

function randomValueHex(len) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
}

var value = randomValueHex(6);

router.post('/', function (req, res, next) {

//    res.json(req.body.playerRole);

    const gameId = value;
    res.redirect('/game/' + gameId);
});


module.exports = router;