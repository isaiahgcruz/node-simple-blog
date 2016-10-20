var express = require('express');
var router = express.Router();
var User = require('../models/user');
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
  User.findOne({ username: req.body.username }, { password: req.body.password }).exec(function(err, user) {
      console.log(user)
      if (err || user === null) {
        return res.status(401).send('login failed');
      }

      const token = jwt.sign({ id: user._id, username: req.body.username }, config.jwtSecret);
      const userInfo = {
        username: req.body.username,
        id: user._id
      }
      return res.status(200).json({ token, userInfo });
    })
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.status(401).send('registration failed').end();
    }

    const token = jwt.sign({ id: user._id, username: req.body.username }, config.jwtSecret);
    const userInfo = {
      username: req.body.username,
      id: user._id
    }
    return res.status(200).json({ token, user });
  });
});

router.get('/logout', function(req, res) {
  res.send('logout successful');
});

var users = require('./users');
var blogs = require('./blogs');
router.use('/users', users);
router.use('/blogs', blogs);

module.exports = router;
