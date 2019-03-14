const router = require('koa-router')()
const multer = require('koa-multer');//加载koa-multer模块
const koaBody = require('koa-body');
const path = require('path')
const fs = require('fs')

router.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));
//普通文件上传
router.post('/upload', async (ctx, next) => {
    // 上传单个文件
    // ctx.request.files.data.name
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../../public/uploads/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "upload success!";
});

/**用户头像上传**/
router.post('/upload_user_img', async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.data; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../../public/uploads/users') + `/${file.name}`;
    let resPath=ctx.origin+'/uploads/users/'+file.name;
    
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);

    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = { path:resPath }

    
});
module.exports = router