<template>
  <form
    ref="dataForm"
    class="dataForm-container"
    @submit.prevent="handleSubmit"
  >
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          name="nickname"
          placeholder="用户昵称"
          :maxlength="maxlength.nickname"
          v-model="formData.nickname"
        />
        <span class="tip"
          >{{ formData.nickname.length }}/{{ maxlength.nickname }}</span
        >
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          name="content"
          :maxlength="maxlength.content"
          cols="30"
          rows="10"
          v-model="formData.content"
          placeholder="输入内容"
        ></textarea>
        <div class="tip">
          {{ formData.content.length }}/{{ maxlength.content }}
        </div>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmitting">
          {{ isSubmitting ? "提交中..." : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "DataForm",
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      maxlength: {
        nickname: 10,
        content: 300,
      },
      isSubmitting: false,
    };
  },
  computed: {
    // 获取文章id
    blogid() {
      return this.$route.params.id;
    },
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请填写内容";
      if (this.error.nickname || this.error.content) return;
      this.isSubmitting = true;
      this.$emit("submit", this.formData, (Msg) => {
        this.$showMessage({
          content: Msg,
          type: "success",
          duration: 1000,
          container: this.$refs.dataForm,
          callback: () => {
            this.isSubmitting = false;
            this.formData.nickname = "";
            this.formData.content = "";
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.dataForm-container {
  width: 100%;
  margin-bottom: 20px;
  .form-item {
    width: 100%;
    margin-bottom: 8px;
    .input-area,
    .text-area {
      position: relative;
      .tip {
        position: absolute;
        color: @gray;
        font-size: 12px;
        bottom: 5px;
        right: 5px;
      }
    }
    input,
    textarea {
      border: 1px @gray dashed;
      font-size: 14px;
      display: block;
      width: 100%;
      &:focus {
        border: 1px @primary dashed;
      }
      &:focus + .tip {
        color: @primary;
      }
    }
    .input-area {
      width: 50%;
      input {
        height: 40px;
        padding: 8px 15px;
      }
    }
    .text-area {
      width: 100%;
      textarea {
        resize: none;
        height: 120px;
        padding: 8px 15px;
      }
    }

    .error {
      font-size: 14px;
      color: @danger;
      height: 20px;
      line-height: 20px;
      margin-top: 6px;
    }
    .button-area {
      width: 100%;
      button {
        width: 100px;
        height: 34px;
        background: @primary;
        color: #fff;
        padding: 1px 6px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background: darken(@primary, 10%);
        }
        &:disabled {
          background: lighten(@primary, 20%);
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
