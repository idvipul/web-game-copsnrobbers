var exports = module.exports = {};
const db = require('../db/index.js');
exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
}; 

exports.dashboard = function(req, res) {
    var gameList;
    db.any('select * from games where "copId" is null or "robberId" is null')
    .then(function(gameList){
        //res.json(gameList);
        //console.log(gameList);

        db.any('select * from users order by score desc')
        .then(function(leadersList){
            //console.log(leadersList);
            res.render('dashboard',
            {
                "x":req.user,
                "lists":gameList,
                "leaders":leadersList
                
                //p:req.player
                }
            );
        })
    })
    .catch(function(error){
        console.log('something went wrong' + error);
    })
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};

