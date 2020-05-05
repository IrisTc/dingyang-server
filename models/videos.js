var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
    'id': Number,
    'title': String,
    'date': String,
    'url': String,
    'coverUrl': String
})

module.exports = mongoose.model('video', videoSchema);