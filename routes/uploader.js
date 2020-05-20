const router = require('koa-router')()
const multer = require('koa-multer')

const coverStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../uploads/covers')
    },
    //文件名称
    filename: function (req, file, cb) {
        console.log(file.originalname)
        cb(null, file.originalname);
    }
})

const videoStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../uploads/covers')
    },
    //文件名称
    filename: function (req, file, cb) {
        console.log(file.originalname)
        cb(null, file.originalname);
    }
})

const coverUpload = multer({ storage: coverStorage})
const videoUpload = multer({ storage: videoStorage})

router.post('/cover/upload', coverUpload.single('file'), async(ctx, next)=>{
    ctx.body = {
        filename: ctx.req.file.filename
    }
})

router.post('/video/upload', videoUpload.single('file'), async(ctx, next)=>{
    ctx.body = {
        filename: ctx.req.file.filename
    }
})

module.exports = router