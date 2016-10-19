var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('username/password is required');
  }

  Account.findOne({ username: req.body.username, password: req.body.password }, function(err, user) {
      if (err) {
        return res.status(401).send('login failed');
      }
      var myToken = jwt.sign({ username: req.body.username }, 'secretKey');
      return res.status(200).json(myToken);
    })
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(401).send('registration failed').end();
    }

    var myToken = jwt.sign({ username: req.body.username }, 'secretKey');
      return res.status(200).json(myToken);
  });
});

router.get('/logout', function(req, res) {
  res.send('logout successful');
});

module.exports = router;
