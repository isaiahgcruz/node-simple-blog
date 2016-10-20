var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt_decode = require('jwt-decode');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find().exec(function (err, users) {
    if (err) {
        res.status(500).send(err);
    }
    res.json({ users });
  });
});

router.post('/', function (req, res, next) {
  if (req.body.token) {
    const decoded = jwt_decode(req.body.token)
    return res.json({ decoded })
  }
  return res.status(200)
});

router.get('/me', function (req, res) {
  const response = {
    authenticated: req.isAuthenticated(),
    user: req.user,
  };
  return res.send(response);
});

router.get('/:id', function (req, res) {
  User.findOne({ id: req.params.id }).exec(function (err, user) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  })
});

module.exports = router;
