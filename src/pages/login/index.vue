<template>
  <Card class="form-wrap">
    <div class="form-title">Login</div>
    <Form
      ref='form'
      :model='form'>
      <FormItem
        :rules="{required: true, message: '请输入用户名', trigger: 'blur'}"
        prop='email'>
        <Input
          v-model="form.email"
          placeholder="输入用户名"
        >
          <Icon type="ios-person-outline" slot="prepend"/>
        </Input>
      </FormItem>
      <FormItem
        :rules="{required: true, message: '请输入密码', trigger: 'blur'}"
        prop='password'>
        <Input
          v-model="form.password"
          type="password"
          placeholder="输入密码">
          <Icon type="ios-lock-outline" slot="prepend"/>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit" long>Signin</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import { login } from '@/utils/api'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      form: {
        email: 'xiouz@163.com',
        password: '12345678',
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate()
        .then(res => {
          if (res) {
            login(this.form)
              .then(res => {
                this.$router.push({path: '/admin/posts'})
                // this.setQNToken(res.data.token)
                // this.setToken(res.data.api_token)
                this.setUser(res.data)
                sessionStorage.token = res.data.api_token
              })
              .catch(_ => {})
          }
        })
    },
    ...mapMutations(['setQNToken', 'setToken', 'setUser'])
  }
}
</script>

<style lang="scss" scoped>
.form-wrap{
  max-width: 300px;
  margin: 20vh auto;
  .form-title{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>
