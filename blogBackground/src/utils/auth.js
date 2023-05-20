// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }
export function getToken() {
  return localStorage.getItem("adminToken");
}
export function setToken(token) {
  return localStorage.setItem("adminToken", token);
}
export function removeToken() {
  return localStorage.removeItem("adminToken");
}
// 统计

// 长
export function getRefresh() {
  return localStorage.getItem("Refresh");
}
export function setRefresh(token) {
  return localStorage.setItem("Refresh", token);
}
export function removeRefresh() {
  return localStorage.removeItem("Refresh");
}
// 短
export function getAccess() {
  return localStorage.getItem("Access");
}
export function setAccess(token) {
  return localStorage.setItem("Access", token);
}
export function removeAccess() {
  return localStorage.removeItem("Access");
}
