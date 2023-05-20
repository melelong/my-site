// 工具函数库

// 时间格式化
export function formatDate(timestamp, showWeek = true) {
  const date = new Date(parseInt(timestamp));
  // 日期信息
  const dateInfo = {
    // 年
    year: date.getFullYear(),
    // 月
    month: date.getMonth() + 1,
    // 日
    day: date.getDate() + 1,
    // 时
    hour: date.getHours(),
    // 分
    minutes: date.getMinutes(),
    // 秒
    seconds: date.getSeconds(),
  };
  for (const key in dateInfo) {
    if (key === "year") continue;
    if (dateInfo[key] >= 0 && dateInfo[key] <= 9)
      dateInfo[key] = `0${dateInfo[key]}`;
  }
  // 存储星期数组
  const weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  // 星期几
  const week = showWeek ? ` ${weekArr[date.getDay()]}` : "";
  return (({ year, month, day, hour, minutes, seconds }, week) =>
    //拼接字符串
    `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${week}`)(
    dateInfo,
    week
  );
}
// 防抖函数
export function debounce(fn, delay = 1000) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, ...args);
    }, delay);
  };
}
// 节流函数
export function throttle(fn, delay = 1000) {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, ...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

/**
 * 处理图表配置
 * @param {Object} data 数据
 * @param {Object} map  数据标签名映射映射
 * @param {String} type 图表类型
 */
export async function getOption(data, map, type = "line") {
  // 公共配置
  const publicConfig = Object.freeze({
    grid: {
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
      top: "2%",
      right: "5%",
    },
  });
  // 匹配图表类型
  const typeO = {
    // 线性图配置
    line: async () => ({
      title: {
        show: true,
        text: data.title || "",
        left: "2%",
        top: "2%",
        textStyle: {
          fontSize: ".8rem",
        },
      },
      tooltip: Object.freeze({
        trigger: "axis",
      }),
      legend: {
        top: "2%",
        show: false,
        textStyle: Object.freeze({
          fontSize: ".6rem",
        }),
        data: data.fields
          .map((item) => map[item])
          .join("|")
          .replace("|", "")
          .split("|"),
      },
      grid: Object.freeze({
        left: "3%",
        right: "3%",
        bottom: "5%",
        containLabel: true,
      }),
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.items[0],
      },
      yAxis: Object.freeze({
        type: "value",
      }),
      series: data.fields
        .map((item) => map[item])
        .join("|")
        .replace("|", "")
        .split("|")
        .map((item, i) => {
          return {
            name: map[data.fields[i + 1]],
            type: "line",
            stack: "Total",
            data: data.items[1].map((item) => (item[i] === "--" ? 0 : item[i])),
          };
        }),
      media: Object.freeze([
        {
          query: {
            minWidth: 831,
          },
          option: {
            legend: {
              show: true,
            },
          },
        },
      ]),
    }),
    // 饼图配置
    pie: async () => ({
      title: {
        show: true,
        text: data.title || "",
        left: "center",
        top: "2%",
        textStyle: Object.freeze({
          fontSize: ".8rem",
        }),
      },
      tooltip: Object.freeze({
        trigger: "item",
      }),
      legend: Object.freeze({
        show: false,
        // type: "scroll",
        orient: "vertical",
        left: "2%",
        top: "2%",
        bottom: "2%",
        textStyle: {
          fontSize: ".6rem",
        },
      }),
      series: [
        {
          name: data.title || "",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "1rem",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: data.items[0]
            .map((item, i) => {
              return {
                value: data.items[1][i],
                name: item[0],
              };
            })
            .sort((a, b) => a.value - b.value),
        },
      ],
      media: [
        {
          query: {
            minWidth: 634,
          },
          option: {
            legend: {
              show: true,
            },
          },
        },
      ],
    }),
    // 地图
    map: async () => {
      // 地图数据
      const mapData = [
        ...new Set(
          data.items[1].map((item1, i) => {
            return JSON.stringify({
              name: `${item1[0]}市`,
              value: `${item1[1]}(访问次数:${
                data.items[1].filter((item) => item[1] === item1[1]).length
              }次)`,
            });
          })
        ),
      ].map((item) => JSON.parse(item));
      // 城市坐标
      const city = [...new Set(data.items[1].map((item) => `${item[0]}市`))];
      async function getGeoCoordMap(cityNames) {
        const geoCoordMap = {};
        const geoc = new BMap.Geocoder();

        async function getPoint(cityName) {
          return new Promise((resolve, reject) => {
            geoc.getPoint(cityName, function (point) {
              if (point) {
                resolve(point);
              } else {
                reject(`获取 ${cityName} 的经纬度坐标失败`);
              }
            });
          });
        }

        const promises = cityNames.map((cityName) => getPoint(cityName));
        const points = await Promise.all(promises);

        points.forEach((point, index) => {
          const cityName = cityNames[index];
          geoCoordMap[cityName] = [point.lng, point.lat];
        });

        return geoCoordMap;
      }
      const geoCoordMap = await getGeoCoordMap(city);
      return {
        title: {
          show: true,
          text: data.title || "",
          left: "2%",
          top: "2%",
          textStyle: Object.freeze({
            fontSize: ".8rem",
          }),
        },
        xAxis: {
          type: "category",
          data: mapData.map((d) => d.value),
        },
        yAxis: Object.freeze({
          type: "value",
        }),
        bmap: {
          center: [39.90469, 116.40717], // 地图中心点
          zoom: 10, // 地图缩放级别
          roam: true, // 是否开启鼠标缩放和平移漫游
          mapStyle: Object.freeze({
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3",
                },
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999",
                },
              },
            ],
          }),
        },
        tooltip: {
          trigger: "item",
          position: function (point, params, dom, rect, size) {
            let x = point[0];
            let y = point[1];
            let width = size.width;
            let height = size.height;
            let gap = 10; // tooltip 距离边缘的间隔

            // 如果鼠标在图表的上半部分，则 tooltip 显示在下方
            // 如果鼠标在图表的下半部分，则 tooltip 显示在上方
            y < height / 2 ? (y += gap) : (y -= rect.height + gap);

            // 如果 tooltip 超出了图表的左边界，则将 tooltip 向右移动
            if (x < rect.width / 2) {
              x = gap;
            } else if (x + rect.width / 2 > width) {
              // 如果 tooltip 超出了图表的右边界，则将 tooltip 向左移动
              x = width - rect.width - gap;
            } else {
              // 如果 tooltip 没有超出图表的边界，则将 tooltip 居中显示
              x -= rect.width / 2;
            }

            return [x, y];
          },
          formatter: (params) => {
            let text = `<div style="text-align:center;font-weight: bold; font-size: 16px;">${params.name}</div>
    <div style="display: flex; justify-content: space-between; flex-direction: column; align-items: left; margin-top: 5px;">`;
            text += mapData
              .filter((item) => item.name === params.name)
              .map(
                (item1) => `
      <div style="font-size: 14px; color: #333; margin-left: 10px;">${item1.value}</div>`
              )
              .join("");
            text += `</div>`;
            return text;
          },
        },
        series: [
          {
            name: `最近访问`,
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: city.map((item, i) => {
              return {
                name: item,
                value: geoCoordMap[item],
              };
            }),
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            emphasis: {
              scale: true,
            },
            // zlevel: 1,
          },
        ],
      };
    },
  };
  // 合并配置
  const res = await typeO[type]();
  return { ...publicConfig, ...res };
}
