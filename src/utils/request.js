import axios from 'axios'
import { getToken } from './auth';
import { serverUrl } from "./config";

const instance = axios.create({
  baseURL: serverUrl,
  timeout: 5000
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers['authorization'] = "Bearer " + getToken()
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

/**
 * url 请求地址
 * params 请求参数
*/
export function get(url,params) {
  return instance.get(url,{
    params
  })
}

export function post(url,data) {
  return instance.post(url,
    data
  )
}

export function put(url,data) {
  return instance.put(url,
    data
  )
}

export function del(url,data) {
  return instance.delete(url,data)
}