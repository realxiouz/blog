<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo"></div>
            <i-button @click="logout">logout</i-button>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" accordion>
            <Submenu name="1">
              <template slot="title">
                <Icon type="md-clipboard" />文章
              </template>
              <MenuItem name="posts" :to="{path: `/admin/posts`}">文章列表</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="md-clipboard" />收藏
              </template>
              <MenuItem name="gathers" :to="{path: `/admin/gathers`}">收藏列表</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="md-clipboard" />随笔
              </template>
              <MenuItem name="1-1" :to="{path: `/admin/says`}">随笔列表</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="md-clipboard" />七牛
              </template>
              <MenuItem name="qiniu" :to="{path: `/admin/qn`}">图片列表</MenuItem>
            </Submenu>
            <MenuItem name="1-1" :to="{path: `/admin/qn`}">标签管理</MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px'}">
          <!-- <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb> -->
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view :key='key'/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data: _ => ({
    timer: 0,
    count: 0
  }),
  computed: {
    key() {
      return this.$route.path + new Date()
    },
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$store.commit('setUser', {})
      this.$router.push({path: '/admin/login'})
    },
    resetCount() {
      this.count = 0
    }
  },
  created() {
    document.addEventListener('mousemove', this.resetCount)
    this.timer = setInterval(_ => {
      this.count++
      // console.log('count', this.count)
      if (this.count > 10) {
        this.$Notice.info({
            title: '长时间未登录，自动退出',
            duration: 0
        })
        clearInterval(this.timer)
        document.removeEventListener('mousemove', this.resetCount)
        this.logout()
      }
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>

</style>
