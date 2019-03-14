const router = require('koa-router')();
const userModel = require('./mysql.js');
const md5 = require('md5')
const fs = require('fs')
// 注册页面
router.post('/login_test', async (ctx, next) => {
    console.log(ctx.request.body)
    let name = ctx.request.body.name;
    let pass = ctx.request.body.pass;
    await userModel.findDataByName(name)
        .then(result => {
            let res = result
            // if (name === res[0]['name'] && md5(pass) === res[0]['pass']) {
            if (name === res[0]['name'] && pass === res[0]['pass']) {
                ctx.body = true
                console.log('登录成功')
            } else {
                ctx.body = false
                console.log('用户名或密码错误!')
            }
        }).catch(err => {
            console.log(err)
        })
})
router.post('/register_test', async (ctx, next) => {
    console.log(ctx.request.body)
    let val=ctx.request.body;
    await userModel.insertData(val)
        .then(res => {
            console.log('ressss', res);
            ctx.body = true
        }).catch(err => {
            console.log('err',err)
        })

})
module.exports = router