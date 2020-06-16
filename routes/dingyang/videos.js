const router = require('koa-router')()
const Videos = require('../../models/videos')
const Counts = require('../../models/counts')
const shell = require('child_process')


router.prefix('/api/dingyang/video')

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
    data.id = doc.length + 1
    let data = ctx.request.body
    data.date = new Date().Format("yyyy-MM-dd")
    
    let params = {
        "id": data.id,
        "type": "video",
        "category": ""
    }

    //写入count数据，为了Nuxt项目的generate
    fs.readFile(path.join(nuxt.path, '/count.json'), function (err, data) {
        if (err) {
            console.log(err)
            ctx.body = {
                status: 100,
                msg: err
            }
        }
        var jsonData = data.toString()
        jsonData = JSON.parse(jsonData)
        jsonData.push(params)
        var str = JSON.stringify(jsonData)
        fs.writeFile(path.join(nuxt.path, '/count.json'), str, function (err) {
            if (err) {
                console.log(err)
                ctx.body = {
                    status: 100,
                    msg: err
                }
            }
        })
    })

    Videos.create(data)
    
    shell.exec('npm run generate', {cwd: nuxt.path}, function(err){
        console.log(err)
     })
    
    ctx.body = {
        status: '200',
        msg: 'add successfully'
    }
})

module.exports = router