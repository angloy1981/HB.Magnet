import request from '@/utils/request'

export const getRoutes = (pid: number) =>
  request({
    url: `/services/app/Menus/List/${pid}`,
    baseURL: 'http://localhost:21021/api',
    method: 'get'
  }).then(res=>{
      return {code: 20000, data: res.result}
  })

export const createRoute = (data: any) =>
  request({
    url: '/menus/create',
    baseURL: 'http://localhost:21021/api',
    method: 'post',
    data
  })

export const updateRoute = (id: number, data: any) =>
  request({
    url: `/menus/update/${id}`,
    method: 'post',
    data
  })

export const deleteRoute = (id: number) =>
  request({
    url: `/menus/delete/${id}`,
    method: 'get'
  })
