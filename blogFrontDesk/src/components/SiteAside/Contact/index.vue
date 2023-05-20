<template>
  <ul class="contact-container">
    <li v-for="item in data" :key="item.icon">
      <template v-if="item.link">
        <a target="_blank" :href="item.link" class="link">
          <div :class="{ icon: true, weixin: item.icon === 'weixin' }">
            <Icon :type="item.icon" />
          </div>
          <span class="text">{{ item.text }}</span>
        </a>
      </template>
      <template v-if="!item.link">
        <span target="_blank" :href="item.link" class="link">
          <div :class="{ icon: true, weixin: item.icon === 'weixin' }">
            <Icon :type="item.icon" />
          </div>
          <span class="text">{{ item.text }}</span>
        </span>
      </template>
      <div class="pop" v-if="item.img">
        <img :src="item.img" alt="" srcset="" />
      </div>
    </li>
  </ul>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  name: "Contact",
  data() {
    return {};
  },
  components: {
    Icon,
  },
  computed: {
    data() {
      const oldData = this.$store.state.setting.data;
      return [
        {
          icon: "github",
          text: oldData.githubName,
          link: oldData.github,
        },
        {
          icon: "mail",
          text: oldData.mail,
          link: `mailto:${oldData.mail}`,
        },
        {
          icon: "qq",
          text: oldData.qq,
          link: `tencent://message/?Menu=yes&uin=${oldData.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`,
          img: oldData.qqQrCode,
        },
        {
          icon: "weixin",
          text: oldData.weixin,
          // link: "",
          img: oldData.weixinQrCode,
        },
      ];
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  padding: 20px;
  color: @gray;
  user-select: none;
  @itemHeight: 30px;
  @shadow:10px 10px 10px 1px rgba(0,0,0,.5);
  font-size: 14px;
  li {
    height: @itemHeight;
    line-height: @itemHeight;
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scale(1);
      }
    }
    .link {
      cursor: pointer;
      display: flex;
      .icon {
        font-size: 26px;
        width: 36px;
      }
      .weixin {
        font-size: 32px;
        text-indent: -3px;
      }
    }
    .pop {
      position: absolute;
      left: 0;
      bottom: @itemHeight + 5px;
      padding: 10px 15px;
      background: #fff;
      border-radius: 5px;
      box-shadow: @shadow;
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: 0.3s;
      img {
        display: block;
        width: 150px;
        // height: 150px;
        object-fit: cover;
      }
      &::after {
        content: "";
        transform: translateX(-50%) rotate(45deg);
        position: absolute;
        width: 8px;
        height: 8px;
        left: 50%;
        bottom: -4px;
        background: inherit;
        box-shadow: @shadow;
      }
    }
  }
}
</style>
