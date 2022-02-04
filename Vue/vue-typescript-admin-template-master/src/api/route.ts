import request from '@/utils/request'

export const getRoutes = () =>
  request({
    url: '/routes/list',
    method: 'get'
  }).then(res=>{
      return {code: 20000, data: res.result}
  })

export const createRoute = (data: any) =>
  request({
    url: '/route/create',
    method: 'post',
    data
  })

export const updateRoute = (id: number, data: any) =>
  request({
    url: `/route/update/${id}`,
    method: 'post',
    data
  })

export const deleteRoute = (id: number) =>
  request({
    url: `/route/delete/${id}`,
    method: 'get'
  })
