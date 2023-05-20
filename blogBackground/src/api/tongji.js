import request from "@/utils/request";
// 获取站点列表
export async function getSiteList(access_token) {
  return await request({
    url: `/rest/2.0/tongji/config/getSiteList`,
    method: "get",
    params: {
      access_token,
    },
  });
}
// 网站概况(趋势数据)
export async function getTimeTrendRpt({
  access_token,
  site_id,
  start_date,
  end_date,
}) {
  return await request({
    url: `/rest/2.0/tongji/report/getData`,
    method: "get",
    params: {
      access_token,
      site_id,
      method: "overview/getTimeTrendRpt",
      start_date,
      end_date,
      max_results: 0,
      metrics: "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time",
    },
  });
}
// 趋势分析
export async function getTimeA({
  access_token,
  site_id,
  start_date,
  end_date,
}) {
  return await request({
    url: `/rest/2.0/tongji/report/getData`,
    method: "get",
    params: {
      access_token,
      site_id,
      method: "trend/time/a",
      start_date,
      end_date,
      metrics: "visit_count",
      order: "simple_date_title,asc",
      gran: "hour",
      max_results: 0,
      area: "china",
    },
  });
}
// 实时访客
export async function getLatest(access_token, site_id, max = "100") {
  return await request({
    url: `/rest/2.0/tongji/report/getData`,
    method: "get",
    params: {
      access_token,
      site_id,
      method: "trend/latest/a",
      metrics: "area,ip,visit_time",
      order: "ip,desc",
      max_results: max,
      area: "china",
    },
  });
}
// 获取地图json
export async function getMapJson(code) {
  return await request({
    // url: "/areas_v3/bound/geojson",
    // method: "get",
    // params: {
    //   code: `${code}_full`,
    // },
    url: "/api/chinaMap",
    method: "get",
  });
}
