const { resolve } = require('path')
const compose = require('koa-compose')
const glob = require('glob')
registerRouter = ()=>{
    let routes = []
    glob.sync(resolve(__dirname, './', '*.js'))
        .filter(value =>(value.indexOf('index.js') == -1))
        .map(item =>{
            routes.push(require(item).routes())
            routes.push(require(item).allowedMethods())
        })
    return compose(routes)
}

module.exports = registerRouter