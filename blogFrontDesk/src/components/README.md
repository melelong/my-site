# Avatar组件
该组件实现头像
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678255245376-cf420316-f876-4047-ab5a-8951f46473e5.png#averageHue=%235e5e5d&clientId=uc6e822e3-6a94-4&from=paste&height=355&id=ue9bf8e8f&name=image.png&originHeight=355&originWidth=442&originalType=binary&ratio=1&rotation=0&showTitle=false&size=116436&status=done&style=none&taskId=ubf74bf62-652d-4eef-91b6-32b22ef9394&title=&width=442)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| url | 头像图片路径 | String | 是 | 无 |
| size | 头像尺寸，宽高相等 | Number | 否 | 150 |


# Icon组件

使用的图标源来自于「阿里巴巴矢量库」
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678255228320-3a6ca78f-07c3-4fb9-a61c-4de019e82ec8.png#averageHue=%23f2f2f1&clientId=uc6e822e3-6a94-4&from=paste&height=62&id=u331f7d99&name=image.png&originHeight=62&originWidth=754&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19267&status=done&style=none&taskId=u2c0e4f2c-edcf-43cf-9c66-12bb8b03815&title=&width=754)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 图标类型 | String | 是 | 无 |


有效的图标类型：

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678255207455-64e137a5-5cc1-4747-a044-a632606df8d2.png#averageHue=%23fbfaf9&clientId=uc6e822e3-6a94-4&from=paste&height=178&id=u6b48c452&name=image.png&originHeight=178&originWidth=981&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12885&status=done&style=none&taskId=u4b389458-19dc-4b24-9ebb-fa213874186&title=&width=981)

## 自定义配置
修改config.js
```shell
// 配置
const config = {
	// 图标源地址
  url: "//at.alicdn.com/t/font_2164449_nalfgtq7il.css", 
	// 图标名映射
  classMap: {
    home: "iconzhuye",
    success: "iconzhengque",
    error: "iconcuowu",
    close: "iconguanbi",
    warn: "iconjinggao",
    info: "iconxinxi",
    blog: "iconblog",
    code: "iconcode",
    about: "iconset_about_hov",
    weixin: "iconweixin",
    mail: "iconemail",
    github: "icongithub",
    qq: "iconsign_qq",
    arrowUp: "iconiconfonticonfonti2copy",
    arrowDown: "iconiconfonticonfonti2",
    empty: "iconempty",
    chat: "iconliuyan",
  },
};
export { config };
```

# pager组件
该组件实现分页
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678201652789-9359c081-4d2c-46cd-8cff-05274f79e465.png#averageHue=%23fdfdfd&clientId=u3d915e47-8cbb-4&from=paste&height=41&id=u7bfa023c&name=image.png&originHeight=41&originWidth=444&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2560&status=done&style=none&taskId=u9de6f3de-2d6a-482a-8185-22b16844a71&title=&width=444)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| current | 当前页码 | Number | 否 | 1 |
| total | 总数据量 | Number | 否 | 0 |
| limit | 页容量 | Number | 否 | 10 |
| visibleNumber | 可见页码数 | Number | 否 | 10 |
| type | 分页按钮样式(只包含首页、上一页、下一页、尾页) | Array | 否 | ["首页", "上一页", "下一页", "尾页"] |


## 事件
| 事件名 | 含义 | 事件参数 | 参数类型 |
| --- | --- | --- | --- |
| pageChange | 页码变化 | 新的页码 | Number |



# Empty组件
该组件需要在外层容器中横向垂直居中
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678253401524-42bc5d11-a75f-40e9-a2bd-29db8f5ce723.png#averageHue=%23fefefe&clientId=uc6e822e3-6a94-4&from=paste&height=143&id=u38845f68&name=image.png&originHeight=143&originWidth=166&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2796&status=done&style=none&taskId=u16671f7d-d3d5-4600-9ed1-30f0d95f03d&title=&width=166)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| text | 显示的文字 | String | 否 | "无数据" |
| color | 字体图标颜色 | String | 否 | “” |
| size | 图标大小比例 | String | 否 | "100%" |


# ImageLoader组件
该组件可以实现一个渐进式图片

图片加载前后效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678262150022-31d678ac-6219-4b2c-a1c7-73c6daf754d5.png#averageHue=%23ba7852&clientId=uda542be5-8131-4&from=paste&height=300&id=u3e044b04&name=image.png&originHeight=514&originWidth=514&originalType=binary&ratio=1&rotation=0&showTitle=false&size=116357&status=done&style=none&taskId=udfc65bb8-b59e-4047-8c4e-b4ec17dcba2&title=&width=300)![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678262123186-fba56485-c559-4a34-a6da-18eb9b4f0376.png#averageHue=%23ac5d35&clientId=uda542be5-8131-4&from=paste&height=300&id=u413651b9&name=image.png&originHeight=512&originWidth=512&originalType=binary&ratio=1&rotation=0&showTitle=false&size=775168&status=done&style=none&taskId=ud37b3863-5aac-4215-bc3d-61ce3377c9d&title=&width=300)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| src | 原始图片的路径 | String | 是 | 无 |
| placeholder | 原始图片加载完成前的占位图片 | String | 是 | 无 |
| duration | 原始图片加载完成后，切换到原始图经过的毫秒数 | Number | 否 | 500 |

## 事件
| **事件名** | **含义** | **事件参数** | **参数类型** |
| --- | --- | --- | --- |
| load | 原始图片加载完成后触发 | 无 | 无 |

## 示例
```html
<ImageLoader 
	src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
  placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
/>
```

# Contact组件
该组件需要横向撑满容器，背景色透明

效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678426299505-f4b36d55-ee50-4222-8f4f-d41213c26ae9.png#averageHue=%23030201&clientId=u0a4c0a02-8325-4&from=paste&height=183&id=u13856957&name=image.png&originHeight=183&originWidth=243&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8948&status=done&style=none&taskId=u980f2e65-272a-4bb7-b3b2-0f53b6afe53&title=&width=243)![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678426339680-4850299d-219d-4dd4-b0f1-5155ca223fce.png#averageHue=%236e6e6e&clientId=u0a4c0a02-8325-4&from=paste&height=240&id=u44281553&name=image.png&originHeight=240&originWidth=249&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10421&status=done&style=none&taskId=ud634f382-3329-4f88-8a95-4b5037706da&title=&width=249)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| configData | 从服务器获取的组件数据 | Array | 是 | 否 |


# Loading组件
该组件可以实现一个加载中的效果
效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678428458382-c9a7c05b-7ecd-47cd-9974-7858f61d962a.png#averageHue=%23057f05&clientId=u0a4c0a02-8325-4&from=paste&height=226&id=u818b7e1c&name=image.png&originHeight=226&originWidth=234&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17919&status=done&style=none&taskId=u9e2f1ea3-6008-4fce-a1bc-91c7defa867&title=&width=234)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| color1 | 小球1的颜色 | String | 否 | "#000" |
| color2 | 小球2的颜色 | String | 否 | "#fff" |
| size | 大小比例 | String | 否 | "100%" |


# Menu组件
该组件需要横向撑满容器，背景色透明
效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678434042408-2e3461e4-0cd6-46cd-af55-51aad9eb5140.png#averageHue=%23414040&clientId=u0a4c0a02-8325-4&from=paste&height=245&id=u95c36a42&name=image.png&originHeight=245&originWidth=315&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7445&status=done&style=none&taskId=u1739ea7a-ba24-4dd8-8cb4-a555c9bb8bb&title=&width=315)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 从服务器获取的组件数据 | Array | 是 | 否 |
| router | 路由地址 | String | 是 | 否 |
| color | 文字颜色 | String | 否 | "#b4b8bc" |
| hoverColor | 鼠标悬停文字颜色 | String | 否 | "#fff" |
| bgColor | 选中的背景颜色 | String | 否 | "#2f2f2f" |


# SiteAside组件
该组件实现一个网站侧边栏，宽度和高度撑满外层容器
效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678457203421-4690864a-846b-4063-98b6-5d67fb79bf76.png#averageHue=%232d2622&clientId=u7caef781-f33b-4&from=paste&height=937&id=u9e495e42&name=image.png&originHeight=937&originWidth=248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58181&status=done&style=none&taskId=u4f9b5067-80a2-44d3-b523-eebb4eeab36&title=&width=248)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 从服务器获取的组件数据 | Object | 是 | 否 |


# Layout组件
该组件实现了一个布局效果
效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1678522284282-3ee32f26-cfb5-46ac-8a08-55e3f2211d86.png#averageHue=%238fed8f&clientId=u1096099c-5f76-4&from=paste&height=620&id=uce2eb8ce&name=image.png&originHeight=620&originWidth=1178&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13039&status=done&style=none&taskId=u482bee1e-6eb8-4b94-9bb8-afa29ec014f&title=&width=1178)

## 插槽
| 插槽名 | 含义 |
| --- | --- |
| main | 中间主区域 |
| left | 左边栏 |
| right | 右边栏 |


# MessageArea
消息区域组件，可以用于「评论区」和「留言板」
效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1679293904982-5bffaabe-0e52-4730-8d12-dbba74e900c1.png#averageHue=%23f7f7f7&clientId=ud85cb735-b051-4&from=paste&height=829&id=ud864a4c5&name=image.png&originHeight=829&originWidth=1346&originalType=binary&ratio=1&rotation=0&showTitle=false&size=50304&status=done&style=none&taskId=u3da0aa9b-57aa-4e71-a96c-eb15c378cbc&title=&width=1346)
## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 列表标题 | String | 否 | “” |
| subTitle | 列表副标题 | String | 否 | “” |
| list | 列表数据 | Array | 否 | [] |
| isListLoading | 列表是否正在加载中 | Boolean | 否 | false |


## 事件
| 事件名 | 含义 | 事件参数 | 参数类型 |
| --- | --- | --- | --- |
| submit | 用户点击提交时触发 | 数据对象 | Object |

`submit`的事件参数格式为：
```vue
{
  nickname:"昵称",
  content:"内容"
}
```

# ToTop
返回顶部组件，可以用于有滚动条的组件中
效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34617067/1679641187863-b4f26ac2-88a1-4466-9ebf-5b4ad3a51059.png#averageHue=%23fffffc&clientId=uf2f12a1e-f608-4&from=paste&height=92&id=u427ffbd9&name=image.png&originHeight=92&originWidth=97&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1478&status=done&style=none&taskId=uf1ed0bfe-b67d-46fa-8e30-5391d766eee&title=&width=97)

## 属性
| 属性名 | 含义 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| scrollHeight | 此组件出现的滚动高度值 | Number | 否 | 400 |







