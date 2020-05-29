const router = require('koa-router')()
const HyOthers = require('../../models/hyothers')

router.prefix('/api/huayin/other')

router.get('/', async (ctx, next) => {
    let doc = await HyOthers.find(ctx.query).sort([['_id',-1]]).limit(1)
    ctx.body = {
        status: '200',
        msg: '',
        result: doc
    }
})

router.post('/add', async (ctx, next)=>{
    let data = ctx.request.body
    HyOthers.create(data)
    ctx.body = {
        status: '200',
        msg: 'add successfully'
    }
})

module.exports = router
