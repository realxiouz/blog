const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = {
    status: 0,
    data: 'vue koa blog doing'
  }
})

module.exports = router
