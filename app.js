const Koa = require('koa')
const app = new Koa
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const body = require('koa-body')
const cors = require('koa2-cors')

const mongoConf = require('./config/mongo')
mongoConf.connect()
require('./config/util')

const koa_session = require('koa-session')
const session_signed_key = ["some secret hurr"]
const seesion_config = {
    key: 'koa:sess',
    hostname: '127.0.0.1',
    domin: '127.0.0.1:8080',
    path: '/',
    maxAge: 400000,
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

const users = require('./routes/users')
const articles = require('./routes/dingyang/articles')
const counts = require('./routes/dingyang/counts')
const videos = require('./routes/dingyang/videos')
const books = require('./routes/dingyang/books')
const hyArticles = require('./routes/huayin/article')
const hyOthers = require('./routes/huayin/other')

// error handler
onerror(app)

// middlewares
app.use(body())
app.use(json())
app.use(logger())

var corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}
app.use(cors(corsOptions))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
app.use(counts.routes(), counts.allowedMethods())
app.use(videos.routes(), videos.allowedMethods())
app.use(books.routes(), books.allowedMethods())
app.use(hyArticles.routes(), hyArticles.allowedMethods())
app.use(hyOthers.routes(), hyOthers.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
