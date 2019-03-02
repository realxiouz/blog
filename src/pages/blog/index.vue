<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo"></div>
          <MenuItem name="posts" :to="{path: `/blog/posts`}"><Icon type="md-clipboard" />文章</MenuItem>
          <!-- <Submenu name="4">
            <template slot="title">
              <Icon type="md-clipboard" />七牛
            </template>
            <MenuItem name="qiniu" :to="{path: `/admin/qn`}">图片列表</MenuItem>
          </Submenu> -->
        </Menu>
      </Header>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <router-view/>
      </Content>
      <!-- <Layout>
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
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view :key='key'/>
          </Content>
        </Layout>
      </Layout> -->
    </Layout>
  </div>
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.path + new Date()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
