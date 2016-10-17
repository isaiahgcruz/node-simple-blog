var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.status(200).send('login successful');
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(401).send('login failed').end();
    }

    passport.authenticate('local')(req, res, function () {
      res.status(200).send('login successful');
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('logout successful');
});

module.exports = router;
