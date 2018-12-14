const router = require('koa-router')()
const qiniu = require('qiniu')
const axios = require('axios')

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

router.get('/test', async ctx => {
  axios.headers = {
    Authorization: `UpToken cF5slgPBN4Ejbie7irffilrjrNw3WPD80Q1wqAMu:q2lsZMvq5UVYHb2v2Bsicw7a_bk=:eyJzY29wZSI6ImJsb2ciLCJkZWFkbGluZSI6MTU0NDgwNTI1OH0=`
  }
  const res = await axios.get('rsf.qbox.me/list', {
    params: {
      bucket: 'blog'
    }
  })
  ctx.body = {status: 0, data: res}
})

module.exports = router
