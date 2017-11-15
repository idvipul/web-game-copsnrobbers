var express = require('express');
var router = express.Router();
const db = require('../db/index.js');

router.get('/', function(req, res, next) {
    db.any(`SELECT * FROM users`)
        .then(results => res.json(results))
.catch(error => {
        console.log(error)
    res.json({ error })
    });
});

module.exports = router;