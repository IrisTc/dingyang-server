var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    'title': String,
    'content': String
})

module.exports = mongoose.model('book', bookSchema);