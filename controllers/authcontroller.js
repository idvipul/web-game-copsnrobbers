var exports = module.exports = {};
const db = require('../db/index.js');
exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
}; 

exports.dashboard = function(req, res) {

    db.any('select * from users')
    .then(function (results) {
        res.json(results);
        console.log(results);
    })
    .catch(function (error) {
        console.log('something went wrong' + error);
    });



    res.render('dashboard',{
        x:req.user,
        y:req.results
        //p:req.player
        });
};

// exports.game = function(req, res) {
//     res.render('game',{
//         p:req.player
//         });
// };

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
};

