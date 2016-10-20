var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({
  _user: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,

    maxlength: 100,
  },
  
  content: {
    type: String,
    required: true,
  },
},{
  timestamps: true
});

module.exports = mongoose.model('Blog', Blog);