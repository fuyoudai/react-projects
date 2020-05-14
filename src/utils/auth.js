export function getToken() {
  return sessionStorage.getItem("token");
}

export function setToken(value) {
  return sessionStorage.setItem("token",value);
}

export function clearToken() {
  return sessionStorage.removeItem("token");
}

export function isLogined() {
  return sessionStorage.getItem("token") ? true:false;
}