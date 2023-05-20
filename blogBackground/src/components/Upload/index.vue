<template>
  <div>
    <div class="title">{{ uploadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
      :disabled="disabled"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
// import { service_URL } from "@/urlConfig.js";
import { getToken } from "@/utils/auth";

export default {
  name: "Upload",
  props: {
    uploadTitle: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // imgUrl() {
    //   const reg = /^\/static/;
    //   return reg.test(this.value) ? service_URL + this.value : this.value;
    // },
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
        // "Content-Type": `multipart/form-data`,
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        // 上传成功，服务器返回图片上传服务器地址
        this.$emit("input", res.data);
      } else {
        // 有错误
        this.$message({
          showClose: true,
          message: res.msg,
          type: "error",
        });
      }
    },
    beforeAvatarUpload() {},
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
