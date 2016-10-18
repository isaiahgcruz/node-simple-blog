var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var Blog = require('../models/blog');

router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(403).send('forbidden').end();
});

router.get('/', function (req, res, next) {
  Blog.find().exec(function (err, blogs) {
    if (err) {
        return res.status(500).send(err);
    }
    res.json({ blogs });
  });
});

router.get('/:id', function (req, res, next) {
  Blog.findOne({ _id: req.params.id }, function (err, blog) {
    if (err) {
        return res.status(500).send(err);
    }
    res.json({ blog });
  });
});

router.post('/', function (req, res) {
  if (!req.body.blog.title || !req.body.blog.content) {
    return res.status(403).end();
  }

  const newBlog = new Blog(req.body.blog);
  newBlog._user = req.user._id;

  newBlog.save(function (err, saved) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ blog: saved })
  })
})

router.put('/:id', function (req, res) {
  if (!req.body.blog.title || !req.body.blog.content) {
    return res.status(403).end();
  }

  Blog.findOne({ _id: req.params.id }, function(err, blog) {
    if (err) {
      return res.status(500).send(err);
    }
    blog.title = req.body.blog.title;
    blog.content = req.body.blog.content;
    blog.save();
    return res.json({ blog });
  })
});

router.delete('/:id', function(req, res) {
  Blog.findOne({ _id: req.params.id }, function(err, blog) {
    if (err) {
      return res.status(500).send(err);
    }
    blog.remove();
    return res.send('deleted');
  })
})

router.get('/me', function (req, res) {
  Blog.find({ _user: req.user._id }).exec(function (err, blogs) {
    if (err) {
        res.status(500).send(err);
    }
    res.json({ blogs });
  });
});

module.exports = router;
