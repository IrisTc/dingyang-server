var mongoose = require('mongoose');

var countSchema = new mongoose.Schema({
    'type': String,
    'category': String,
    'id': Number
})

module.exports = mongoose.model('count', countSchema);