var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'Account' },
    title: String,
    content: String,
});

module.exports = mongoose.model('Blog', Blog);