var express = require('express');
var router = express.Router();
const db = require('../db/index.js');
/* GET home page. */

router.post('/', function (req, res, next) {
  var winner = req.body.winner;
  db.any('select * from players where "id"=' + winner)
    .then(function (plyr) {
      db.any('update users set score=score+1 where "id"=' + plyr[0]["userId"]);
    })
  res.render("signin");
});

module.exports = router;
