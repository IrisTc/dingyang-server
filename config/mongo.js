const mongoose = require('mongoose')

const url = 'mongodb://root:root@39.105.94.140:27017/dingyang'
module.exports = {
    connect: ()=>{
        mongoose.connect(url)
        let db = mongoose.connection
        db.on("connected", function(){
            console.log('MongoDB connected success.')
        })
        db.on("error", function(){
            console.log("MongoDB connected fail.")
        })
        db.on("disconnected", function(){
            console.log("MongoDB connected disconnected.")
        })
    }
}