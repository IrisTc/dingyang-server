var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    'rank': String,
    'star': String,
    'title': String,
    'director': String,
    'year': String,
    'category': String,
    'imageUrl': String,
    'quote': String,
    'id': Number,
    'like_nums': Number
})

module.exports = mongoose.model('movie', movieSchema);