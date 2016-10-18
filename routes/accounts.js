var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(403).send('forbidden').end();
});

/* GET accounts listing. */
router.get('/', function (req, res, next) {
  Account.find().exec(function (err, accounts) {
    if (err) {
        res.status(500).send(err);
    }
    res.json({ accounts });
  });
});

router.get('/me', function (req, res) {
  const response = {
    authenticated: req.isAuthenticated(),
    user: req.user,
  };
  return res.send(response);
});

router.get('/:id', function (req, res) {
  Account.findOne({ id: req.params.id }).exec(function (err, account) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ account });
  })
});

module.exports = router;
