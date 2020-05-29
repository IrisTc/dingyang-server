const router = require('koa-router')()
const Counts = require('../../models/counts')
router.prefix('/api/dingyang/count')

router.get('/', async(ctx, next)=>{
    let doc = await Counts.find().sort({'id':-1})
    ctx.body = {
        status: '200',
        msg: '',
        result: doc
    }
})

module.exports = router