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
      v-if="fileList.length<=1"
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
import {newSay} from '@/utils/api'
export default {
  computed: {
    ...mapState(['qnToken'])
  },
  mounted() {
    this.fileList = this.$refs.upload.fileList
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
      this.form.img = list[0].response.data;
    },
    handleError(err, file, list) {
      console.log(err, file, list)
    },
    handleNewSay() {
      newSay(this.form).then(r => {

      })
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
