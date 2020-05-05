const router = require('koa-router')()
const Videos = require('../../models/videos')
const Counts = require('../../models/counts')

router.prefix('/video')

router.get('/', async(ctx, next)=>{
    let doc = await Videos.find().sort({'id':-1})
    ctx.body = {
        status: '200',
        msg: '',
        result:{
            count: doc.length,
            list: doc
        }
    }
})

module.exports = router