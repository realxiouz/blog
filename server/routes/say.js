const router = require('koa-router')()
const mysql = require('../common/db')
const Say = mysql.import('../schema/say.js')

router.prefix('/api/say')

// list
router.get('/', async (ctx, next) => {
  try {
    let {limit, page} = ctx.query
    const Says = await Say.findAndCount({
      // where: {
      //   status: 1
      // },
      limit: limit ? +limit : 10,
      offset: page ? (+page - 1) * limit : 0
    })
    ctx.body = {status: 0, data: Says}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

// id
router.get('/id', async (ctx, next) => {
  try {
    let {id} = ctx.query
    const Say = await Say.findOne({
      where: {
        id
      }
    })
    ctx.body = {status: 0, data: Say}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

router.Say('/', async (ctx, next) => {
  const {title, body, tag, category, type, markdown} = ctx.request.body
  try {
    const Says = await Say.create({
      title,
      body,
      tag,
      category,
      type,
      markdown
    })
    ctx.body = {status: 0, data: Says}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

router.delete('/', async (ctx, next) =>  {
  const {id, status} = ctx.request.body
  try {
    const Say = await Say.update({
      status: status === 0 ? 1 : 0
    }, {
      where: {
        id
      }
    })
    ctx.body = {status: 0, data: Say}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

router.put('/', async (ctx) => {
  const { id, title, body, tag, category, type } = ctx.request.body

  try {
    const Say = await Say.update({
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
    ctx.body = {status: 0, data: Say}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

module.exports = router
