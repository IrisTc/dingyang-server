const router = require('koa-router')()
const Books = require('../../models/books')
router.prefix('/api/dingyang/book')

router.get('/', async(ctx, next)=>{
    let doc = await Books.find().sort({'id':-1})
    ctx.body = {
        status: '200',
        msg: '',
        result: doc
    }
})

module.exports = router