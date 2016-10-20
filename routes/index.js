var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('username/password is required');
  }
  Account.findOne({ username: req.body.username }, { password: req.body.password }).exec(function(err, account) {
      console.log(account)
      if (err || account === null) {
        return res.status(401).send('login failed');
      }

      const token = jwt.sign({ id: account._id, username: req.body.username }, config.jwtSecret);
      const user = {
        username: req.body.username,
        id: account._id
      }
      return res.status(200).json({ token, user });
    })
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(401).send('registration failed').end();
    }

    var myToken = jwt.sign({ username: req.body.username }, config.jwtSecret);
      return res.status(200).json(myToken);
  });
});

router.get('/logout', function(req, res) {
  res.send('logout successful');
});

module.exports = router;
