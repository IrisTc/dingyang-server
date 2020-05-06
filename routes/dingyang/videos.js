const router = require('koa-router')()
const Videos = require('../../models/videos')
const Counts = require('../../models/counts')
const shell = require('shelljs')


router.prefix('/dingyang/video')

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

router.post('/add', async (ctx, next)=>{
    let doc = await Videos.find().sort({'id':-1})
    let count = doc.length
    let data = ctx.request.body
    data.date = new Date().Format("yyyy-MM-dd")
    data.id = count+1
    Videos.create(data)
    Counts.create({
        "id": data.id,
        "type": "video",
        "category": ""
    }).then(()=>{
        shell.cd('/www/wwwroot/dy.tcualhp.cn/dingyang-nuxt')
        if (shell.exec('npm run generate').code !== 0) {//执行npm run generate 命令
            shell.echo('generate commit failed');
            shell.exit(1);
        }
        ctx.body = {
            status: '200',
            msg: 'add successfully'
        }
    })
    
})

module.exports = router