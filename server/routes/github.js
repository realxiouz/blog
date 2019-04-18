const router = require('koa-router')()
const axios = require('axios')

router.prefix('/github')

router.get('/callback', async ctx => {
  const code = ctx.query.code
  const state = ctx.query.state
  try {
    const res = await axios.post(`https://github.com/login/oauth/access_token`, {
      code,
      client_id: '14e0e049eb3fd4e101bb',
      state,
      client_secret: 'a1a4fe6f3d2de4a48a6fa57da39136aa15486988'
    })
    let arr = res.data.split('&')
    let token = arr[0].split('=')
    let r = await axios.get(`https://api.github.com/user?access_token=${token[1]}`)
    if (r.data) {
      ctx.body = {status: 0, data: r.data}
    }
  } catch (err) {
    console.log(err)
    ctx.body = {status: 1, data: 'err'}
  }
})

module.exports = router
