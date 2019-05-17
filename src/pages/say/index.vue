<template>
  <div>
    <div class="imgs"
      v-for="(i, inx) in fileList"
      :key="inx"
    >
      <div>
        <!-- <img :src="`http://pjpw0xspe.bkt.clouddn.com/${i.response.hash}`"> -->
        <img :src="`http://localhost:8000/${i.response.data}`">
      </div>
    </div>
    <!-- <Upload
      action="http://upload-z2.qiniup.com"
      :data="{token: qnToken}"
      :show-upload-list='false'
      :default-file-list='fileList'
      :on-success='handleSuccess'
      :on-error='handleError'
      ref="upload"
      v-if="fileList.length<=1"
    >
      <div class="upload-btn">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload> -->
    <Upload
      action="/api/upload"
      name="file"
      :show-upload-list='false'
      :default-file-list='fileList'
      :on-success='handleSuccess'
      :on-error='handleError'
      ref="upload"
      v-if="fileList.length<1"
    >
      <div class="upload-btn">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Input v-model="form.content" placeholder="Enter something..." style="width: 300px" />
    <Button @click="handleNewSay">commit</Button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {newSay, getSayById, editSay} from '@/utils/api'
export default {
  computed: {
    ...mapState(['qnToken'])
  },
  mounted() {
    if (this.$route.params.id) {
      getSayById(this.$route.params.id).then(r => {
        let {content, img} = r.data
        this.form.content = content
        if (img) {
          this.form.img = img
          this.fileList = [{response: {data: img}}]
        }
      })
    }
  },
  data() {
    return {
      fileList: [],
      value: '',
      form: {
        content: ''
      }
    }
  },
  methods: {
    handleSuccess(res, file, list) {
      // console.log(res, file, list)
      this.fileList = list
      this.form.img = list[0].response.data
    },
    handleError(err, file, list) {
      console.log(err, file, list)
    },
    handleNewSay() {
      if (this.$route.params.id) {
        editSay(Object.assign({}, this.form, {id: this.$route.params.id})).then(r => {
          this.$Message.info('发布成功')
          this.$router.go(-1)
        })
      } else {
        newSay(this.form).then(r => {
          this.$Message.info('发布成功')
          this.$router.go(-1)
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.imgs{

}
.upload-btn{
  width: 58px;
  height: 58px;
  border: 1px dashed #dcdee2;
  text-align: center;
  line-height: 58px;
  border-radius: 4px;
}
</style>
