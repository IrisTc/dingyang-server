var mongoose = require('mongoose')
var Schema = mongoose.Schema

var articleSchema = new Schema({
    "id": Number,
    "title": String,
    "date": String,
    "description": String,
    "content": String,
    "coverUrl": String,
    "type": String
})

module.exports = mongoose.model('Article', articleSchema)