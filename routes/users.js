const router = require('koa-router')()
const Users = require('../models/users')

router.prefix('/user')

router.post('/login', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Credentials', true);
    data = {
        "name": ctx.query.name,
        "password": ctx.query.password
    }
    let doc = await Users.find(data)
    if(doc.length !== 0){
        ctx.session.logged = true
    }
    ctx.body = {
        status: '200',
        msg: '',
        result: doc
    }
})

module.exports = router
