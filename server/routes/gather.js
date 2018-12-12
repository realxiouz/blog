const router = require('koa-router')()
const mysql = require('../common/db')
const Gather = mysql.import('../schema/gather.js')

router.prefix('/api/gather')

// list
router.get('/', async (ctx, next) => {
  try {
    let {limit, page} = ctx.query
    const posts = await Gather.findAndCount({
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
    const post = await Gather.findOne({
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
  const {title, detail, tag} = ctx.request.body
  try {
    const gather = await Gather.create({
      title,
      detail,
      tag,
    })
    ctx.body = {status: 0, data: gather}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

router.delete('/', async (ctx, next) =>  {
  const {id, status} = ctx.request.body
  try {
    const post = await Gather.update({
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
  const { id, title, detail, tag } = ctx.request.body

  try {
    const gather = await Gather.update({
      title,
      detail,
      tag
    }, {
      where: {
        id
      }
    })
    ctx.body = {status: 0, data: gather}
  } catch (err) {
    ctx.body = {status: 1, msg: JSON.stringify(err)}
  }
})

module.exports = router
