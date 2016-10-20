var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var jwt_decode = require('jwt-decode');

/* GET accounts listing. */
router.get('/', function (req, res, next) {
  Account.find().exec(function (err, accounts) {
    if (err) {
        res.status(500).send(err);
    }
    res.json({ accounts });
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
  Account.findOne({ id: req.params.id }).exec(function (err, account) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ account });
  })
});

module.exports = router;
