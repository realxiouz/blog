const router = require('koa-router')()
const mysql = require('../common/db')
const Post = mysql.import('../schema/article.js')

router.prefix('/api/post')

// list
router.get('/', async (ctx, next) => {
  try {
    let {limit, page} = ctx.query
    const posts = await Post.findAndCount({
      // where: {
      //   status: 1
      // },
      limit: limit ? +limit : 10,
      offset: page ? (+page - 1) * limit : 0
    })
    ctx.body = {status: 0, data: posts}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

// id
router.get('/id', async (ctx, next) => {
  try {
    let {id} = ctx.query
    const post = await Post.findOne({
      where: {
        id
      }
    })
    ctx.body = {status: 0, data: post}
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

router.delete('/', async (ctx, next) =>  {
  const {id, status} = ctx.request.body
  try {
    const post = await Post.update({
      status: status === 0 ? 1 : 0
    }, {
      where: {
        id
      }
    })
    ctx.body = {status: 0, data: post}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

router.put('/', async (ctx) => {
  const { id, title, body, tag, category, type } = ctx.request.body

  try {
    const post = await Post.update({
      title,
      body,
      tag,
      category,
      type
    }, {
      where: {
        id
      }
    })
    ctx.body = {status: 0, data: post}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

module.exports = router
