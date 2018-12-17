<template>
  <div>
    <div class="imgs"
      v-for="(i, inx) in fileList"
      :key="inx"
    >
      <div>
        <img :src="`http://pjpw0xspe.bkt.clouddn.com/${i.response.hash}`" alt="">
      </div>
    </div>
    <Upload
      action="http://upload-z2.qiniup.com"
      :data="{token: qnToken}"
      :show-upload-list='false'
      :default-file-list='fileList'
      :on-success='handleSuccess'
      :on-error='handleError'
      ref="upload"
    >
      <!-- <Button icon="ios-cloud-upload-outline">Upload files</Button> -->
      <div
        class="upload-btn"
      >
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['qnToken'])
  },
  mounted() {
    this.fileList = this.$refs.upload.fileList
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleSuccess(res, file, list) {
      console.log(res, file, list)
      this.fileList = list
    },
    handleError(err, file, list) {
      console.log(err, file, list)
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
