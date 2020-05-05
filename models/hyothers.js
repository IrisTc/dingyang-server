var mongoose = require('mongoose')
var Schema = mongoose.Schema

var otherSchema = new Schema({
    "type": String,
    "typeTitle": String,
    "content": String
})

module.exports = mongoose.model('hyOther', otherSchema)