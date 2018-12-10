const router = require('koa-router')()
const mysql = require('../common/db')
const Post = mysql.import('../schema/article.js')

router.prefix('/api/post')

router.get('/', async (ctx, next) => {
  try {
    let {limit, page} = ctx.query
    const posts = await Post.findAndCount({
      where: {
        status: 1
      },
      limit: +limit,
      offset: (+page - 1) * limit
    })
    ctx.body = {status: 0, data: posts}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

router.post('/', async (ctx, next) => {
  const {title, body, tag, category, type, markdown} = ctx.request.body
  try {
    const posts = await Post.create({
      title,
      body,
      tag,
      category,
      type,
      markdown
    })
    ctx.body = {status: 0, data: posts}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

module.exports = router
