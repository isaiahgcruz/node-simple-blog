var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Blog', Blog);