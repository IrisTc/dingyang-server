const router = require('koa-router')()
const multer = require('koa-multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../uploads/')
    },
    //文件名称
    filename: function (req, file, cb) {
        console.log(file.originalname)
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage})

router.post('/upload', upload.single('file'), async(ctx, next)=>{
    console.log(ctx.req.file)
    ctx.body = {
        filename: ctx.req.file.filename
    }
})

module.exports = router