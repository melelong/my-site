import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar:
      "xxx", //个人空间的头像
    siteTitle: "xxx", //个人空间的标题
    text: "xxx",
    github: "xxx", //空间主人的github地址
    qq: "xxx", //空间主人的qq号
    qqQrCode:
      "xxx", //空间主人的qq二维码
    weixin: "xxx", //空间主人的微信
    weixinQrCode:
      "xxx", //空间主人的微信二维码
    mail: "xxx", //空间主人的邮箱
    icp: "xxx", //空间主人的备案号
    githubName: "xxx", //空间主人的github名称
    favicon:
      "xxx", //网站的favicon地址
  },
});
