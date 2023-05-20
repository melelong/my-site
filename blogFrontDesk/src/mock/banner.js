import Mock from "mockjs";

Mock.mock("/api/banner", "get", {
  // code: 300,
  // msg: "我也不知道发生了什么事",
  code: 0,
  msg: "",
  data: [
    {
      id: "1",
      midImg:
        "https://s1.vika.cn/space/2023/03/14/0eec46418d18491eac9657b0c7f14225",
      bigImg:
        "https://s1.vika.cn/space/2023/03/14/ee18a2e8431e46cf9215a13e4c383c92",
      title: "凛冬将至",
      description: "人唯有恐惧的时候方能勇敢",
    },
    {
      id: "2",
      midImg:
        "https://s1.vika.cn/space/2023/03/14/4743c9bc63ac442691259c850695231d",
      bigImg:
        "https://s1.vika.cn/space/2023/03/14/62fa2afbc58c4c01bba69bde20716bea",
      title: "血火同源",
      description: "如果我回头，一切都完了",
    },
    {
      id: "3",
      midImg:
        "https://s1.vika.cn/space/2023/03/14/c32874255c0e462797277bbb43aa602d",
      bigImg:
        "https://s1.vika.cn/space/2023/03/14/318a2d7ffbaa4826a3fb1d3a417b46e6",
      title: "听我怒吼",
      description: "兰尼斯特有债必偿",
    },
  ],
});
