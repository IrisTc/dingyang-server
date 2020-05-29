const Koa = require('koa')
const app = new Koa
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const body = require('koa-body')
const cors = require('koa2-cors')
const static = require('koa-static')
app.use(static(__dirname+'/public'))

const mongoConf = require('./config/mongo')
mongoConf.connect()
require('./config/util')

const koa_session = require('koa-session')
const session_signed_key = ["some secret hurr"]
const seesion_config = {
    key: 'UserName',
    path: '/',
    maxAge: 60*60*24*7*1000,
    autoCommit: true,
    overwrite:true,
    httpOnly:false,
    signed: true,
    rolling:true,
    renew:false,
    credentials: true
}
const session = koa_session(seesion_config, app)
app.keys = session_signed_key;
app.use(session)

const uploader = require('./routes/uploader')
const users = require('./routes/users')
const dyRouter = require('./routes/dingyang/index')
const hyRouter = require('./routes/huayin/index')

// error handler
onerror(app)

// middlewares
app.use(body())
app.use(json())
app.use(logger())
app.use(cors())


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(uploader.routes(), uploader.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(dyRouter())
app.use(hyRouter())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
