const router = require('koa-router')()
const Articles = require('../../models/articles')
const Counts = require('../../models/counts')
const fs = require('fs')
const path = require('path')
const nuxt = require('../../config/nuxt')
const shell = require('child_process')


router.prefix('/api/dingyang/article')


router.get('/', async (ctx, next) => {
    console.log(path.join(nuxt.path, '/count.json'))

    let count = parseInt(ctx.query.count)
    let type = ctx.query.type
    let id = ctx.query.id
    let params = {}
    if (type) {
        params.type = type
    }
    if (id) {
        params.id = id
    }
    let doc = await Articles.find(params).sort({ 'id': -1 }).limit(count)
    ctx.body = {
        status: '200',
        msg: '',
        result: doc
    }
})

router.post('/add', async (ctx, next) => {
    var data = ctx.request.body
    let doc = await Articles.find({ type: data.type }).sort()
    data.id = doc.length + 1
    data.date = new Date().Format("yyyy-MM-dd")
    let params = {
        "id": data.id,
        "type": "article",
        "category": data.type
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
    
    Articles.create(data)
    console.log('add json successfully')

    shell.exec('npm run generate', {cwd: nuxt.path}, function(err){
        console.log(err)
     })

    ctx.body = {
        status: '200',
        msg: 'add successfully'
    }
})

module.exports = router
