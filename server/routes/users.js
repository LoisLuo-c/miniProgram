const router = require('koa-router')()
var user=require('../app/component/user.js');
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.use('/user', user.routes(), user.allowedMethods())
module.exports = router
