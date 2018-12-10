const router = require('koa-router')()
const mysql = require('../common/db')
const User = mysql.import('../schema/user.js')

router.prefix('/api/user')

router.post('/login', async(ctx) => {
  const { name, pwd } = ctx.request.body
  try {
    const user = await User.findOne({
      where: {
        username: name,
        password: pwd
      }
    })
    if (user) {
      ctx.body = {status: 0}
    } else {
      ctx.body = {status: 1, msg: 'no such user'}
    }
  } catch (err) {
    ctx.body = {status: 1, msg: 'sql eror'}
  }
})

module.exports = router
