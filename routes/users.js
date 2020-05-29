const router = require('koa-router')()
const Users = require('../models/users')
const bcrypt = require('bcryptjs')

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    let data = ctx.request.body
    let user = await Users.findOne({name: data.name})
    console.log(user)
    if(user !== null){
        let confirmRes = bcrypt.compareSync(data.password, user.password)
        if(confirmRes){
            ctx.session.user = {
                _id: user._id,
                uername: user.name
            }
            ctx.body = {
                status: 200,
                msg: 'login successfully'
            }
        }else{
            ctx.body = {
                status: -1,
                msg: 'login failed'
            }
        }
    }
    
})

router.post('/register', async (ctx, next)=>{
    let data = ctx.request.body
    let salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    await Users.create(data).then(()=>{
        ctx.body = {
            status: '200',
            user: data,
            msg: 'register successfully'
        }
    }).catch(()=>{
        ctx.body = {
            status: '500',
            msg: 'register'
        }
    })
})
module.exports = router
