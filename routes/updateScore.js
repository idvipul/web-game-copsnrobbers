var express = require('express');
var router = express.Router();
const db = require('../db/index.js');
/* GET home page. */

router.post('/', function (req, res, next) {
  var winner = req.body.winner.split(" ");
  console.log("Concatenated Winner"+winner);
  db.any('select * from games where "id"=\''+winner[1]+'\'')
  .then(function (game) {
    if(winner[0]=='1'){
      db.any('select * from players where "id"='+game[0]["copId"])
      .then(function(plyr){
        db.any('update users set score=score+1 where "id"=' + plyr[0]["userId"]);
      })
    }
    else if(winner[0]=='2'){
      db.any('select * from players where "id"='+game[0]["robberId"])
      .then(function(plyr){
        db.any('update users set score=score+1 where "id"=' + plyr[0]["userId"]);
      })
    }
  })
  res.render("signin");
});

module.exports = router;



