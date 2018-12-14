const router = require('koa-router')()
const qiniu = require('qiniu')

router.prefix('/api/common')

router.post('/webhook', async (ctx, next) => {
  var callfile = require('child_process')

  const res = await callfile.execFile(require('path').join(__dirname, '../bashs/git'))
  ctx.body = {
    status: 0,
    data: res
  }
  // callfile.execFile(require('path').join(__dirname, '../bashs/git'), function (err, stdout) {
  //   if (err) {
  //     ctx.body = {
  //       status: 1,
  //       data: 'err happen'
  //     }
  //   } else {
  //     ctx.body = {
  //       status: 0,
  //       data: stdout
  //     }
  //   }
  // })
})

router.get('/qn-token', async ctx => {
  var ak = 'cF5slgPBN4Ejbie7irffilrjrNw3WPD80Q1wqAMu'
  var sk = '5CkJK7SI1Eu6kD70eqgjeprYN0wxzvfPs9PGekdx'
  var mac = new qiniu.auth.digest.Mac(ak, sk)
  var options = {
    scope: 'blog',
    expires: 7200
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var token = putPolicy.uploadToken(mac)
  ctx.body = {
    status: 0, data: {token, expires: 7200 * 1000 + new Date().getTime()}
  }
})
// cF5slgPBN4Ejbie7irffilrjrNw3WPD80Q1wqAMu:mmKzn6MQtCc5xclnePHQ1w1Fi1s=:eyJzY29wZSI6ImJsb2ciLCJkZWFkbGluZSI6MTU0NDc4NjEzOX0=
// cF5slgPBN4Ejbie7irffilrjrNw3WPD80Q1wqAMu:BXOKFk7yPsljY3KTSSiPUQXeaJE=:eyJzY29wZSI6ImJsb2ciLCJkZWFkbGluZSI6MTU0NDc4NjI2OH0=
module.exports = router
