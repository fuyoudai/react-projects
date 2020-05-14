import { get, post, put, del } from '../utils/request'

//获取列表
export function listApi(page = 1) {
  return get("/api/v1/admin/products", { page })
}

//创建记录
export function createApi(data) {
  return post("/api/v1/admin/products", data)
}

//根据id获取数据
export function getOneById(id) {
  return get(`/api/v1/admin/products/${id}`)
}

//修改记录
export function modifyOne(id,data) {
  return put(`/api/v1/admin/products/${id}`, data)
}

//删除记录
export function delOne(id) {
  return del(`/api/v1/admin/products/${id}`)
}