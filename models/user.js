var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,

    minlength: 6,
    maxlength: 255,
  },

  password: {
    type: String,
    required: true,

    minlength: 6,
  },
  
  blogs: [{ type: Schema.Types.ObjectId, refs: 'Blog'}],
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);