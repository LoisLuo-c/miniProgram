const router = require('koa-router')()
var upload=require('../app/base/uploadfile.js');
var login=require('../app/base/login.js');
router.prefix('/base')
router.use('/upload', upload.routes(), upload.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
module.exports = router