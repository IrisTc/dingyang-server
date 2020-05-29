const router = require('koa-router')()
const HyArticles = require('../../models/hyarticles')

router.prefix('/api/huayin/article')

router.get('/', async (ctx, next) => {
    let count = parseInt(ctx.query.count)
    let type = ctx.query.type
    let id = ctx.query.id
    let params = {}
    if(type){
        params.type = type
    }
    if(id){
        params.id = id
    }
    let doc = await HyArticles.find(params).sort({'id':-1}).limit(count)
    ctx.body = {
        status: '200',
        msg: '',
        result: doc
    }
})

router.post('/add', async (ctx, next)=>{
    let doc = await HyArticles.find().sort({'id':-1})
    let count = doc.length
    let data = ctx.request.body
    data.date = new Date().Format("yyyy-MM-dd")
    data.id = count+1
    HyArticles.create(data)
    ctx.body = {
        status: '200',
        msg: 'add successfully'
    }
})

module.exports = router
