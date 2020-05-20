const router = require('koa-router')()
const Articles = require('../../models/articles')
const Counts = require('../../models/counts')
const fs = require('fs')
const path = require('path')
const nuxt = require('../../config/nuxt')
// const shell = require('shelljs')


router.prefix('/dingyang/article')


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
    let data = ctx.request.body
    let doc = await Articles.find({ type: data.type }).sort()
    let count = doc.length

    data.date = new Date().Format("yyyy-MM-dd")
    data.id = count + 1
    Articles.create(data)

    let params = {
        "id": data.id,
        "type": "article",
        "category": data.type
    }

    fs.readFile(path.join(nuxt.path, '/count.json'), function (err, data) {
        if (err) {
            console.log(err)
        }
        var jsonData = data.toString()
        jsonData = JSON.parse(jsonData)
        jsonData.push(params)
        var str = JSON.stringify(jsonData)
        fs.writeFile(path.join(nuxt.path, '/count.json'), str, function (err) {
            if (err) {
                console.log(err)
            }
            console.log('add json successfully')
        })
    })

    // shell.cd(nuxt.path)
    // if (shell.exec('npm run generate').code !== 0) {//执行npm run generate 命令
    //     shell.echo('generate commit failed');
    //     shell.exit(1);
    // }
    ctx.body = {
        status: '200',
        msg: 'add successfully'
    }
})

module.exports = router
