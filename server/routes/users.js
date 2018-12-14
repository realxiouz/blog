const router = require('koa-router')()
const mysql = require('../common/db')
const User = mysql.import('../schema/user.js')
const qiniu = require('qiniu')

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
      const ak = 'cF5slgPBN4Ejbie7irffilrjrNw3WPD80Q1wqAMu'
      const sk = '5CkJK7SI1Eu6kD70eqgjeprYN0wxzvfPs9PGekdx'
      const mac = new qiniu.auth.digest.Mac(ak, sk)
      const options = {
        scope: 'blog',
        expires: 7200
      }
      const putPolicy = new qiniu.rs.PutPolicy(options)
      const token = putPolicy.uploadToken(mac)
      ctx.body = {
        status: 0, data: {token, expires: 7200 * 1000 + new Date().getTime()}
      }
    } else {
      ctx.body = {status: 1, msg: 'no such user'}
    }
  } catch (err) {
    ctx.body = {status: 1, msg: 'sql eror'}
  }
})

module.exports = router
