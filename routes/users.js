const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt_decode = require('jwt-decode');
const Blog = require('../models/blog');

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

router.get('/:id/blogs', function(req, res) {
  Blog.find().sort({ createdAt: -1 }).populate('_user').populate('likers').find({_user: req.params.id }).exec(function (err, blogs) {
    if (err) {
        return res.status(500).send(err);
    }
    res.json({ blogs });
  });
})

router.get('/:id', function (req, res) {
  User.findOne({ _id: req.params.id }).exec(function (err, user) {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  })
});

module.exports = router;
