const router = require('koa-router')()
const Articles = require('../../models/articles')
const Counts = require('../../models/counts')
const shell = require('shelljs')


router.prefix('/dingyang/article')


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
    let doc = await Articles.find(params).sort({'id':-1}).limit(count)
    ctx.body = {
        status: '200',
        msg: '',
        result: doc
    }
})

router.post('/add', async (ctx, next)=>{
    let doc = await Articles.find().sort({'id':-1})
    let count = doc.length
    let data = ctx.request.body
    data.date = new Date().Format("yyyy-MM-dd")
    data.id = count+1
    Articles.create(data)
    Counts.create({
        "id": data.id,
        "type": "article",
        "category": data.type
    }).then(()=>{
        shell.cd('/www/wwwroot/dy.tcualhp.cn/dingyang-nuxt')
        if (shell.exec('npm run generate').code !== 0) {//执行npm run generate 命令
            shell.echo('generate commit failed');
            shell.exit(1);
        }
    })
    ctx.body = {
        status: '200',
        msg: 'add successfully'
    }
})

module.exports = router
