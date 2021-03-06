/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');
module.exports = {

    login: function(req, res) {
        res.view();
    },
    process: function (req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: 'login failed'
                });
                res.send(err);
            }
            req.logIn(user, function(err) {
                if (err) res.json(err);
                req.session.User= user;
                console.log('user in controller: '+JSON.stringify(user));
                return res.json({
                    message: 'login successful'
                });
            });
        })(req, res);
    },
    logout: function(req, res) {
        req.logout();
        res.send('logout successful');
    }

};