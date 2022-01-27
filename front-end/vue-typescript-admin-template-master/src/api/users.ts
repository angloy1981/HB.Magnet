import request from '@/utils/request'
import { getTenantId } from '@/utils/cookies'

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getCurrentTenant = () =>
  request(
    {
      url: '/services/app/Session/GetCurrentLoginInformations',
      baseURL: 'http://localhost:21021/api',
      method: 'get',
      headers: {
        'Abp.TenantId': `${getTenantId()}`
      }
    }
  ).then(res => {
    return { code: '20000', data: res }
  })

export const isTenantAvailable = (data:any) =>
  request(
    {
      url: '/services/app/Account/IsTenantAvailable',
      baseURL: 'http://localhost:21021/api',
      method: 'post',
      data
    }).then(res => {
    return { code: '20000', data: res }
  })

export const getUserInfo = (id: string) =>
  request(
    {
      url: `/services/app/user/get?id=${id}`,
      baseURL: 'http://localhost:21021/api',
      method: 'get'
      // url: '/users/info',
      // method: 'post',
      // data
    }).then(Response => {
    return { code: '20000', data: Response }
    // return response
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/TokenAuth/Authenticate',
    baseURL: 'http://localhost:21021/api',
    // url:'/users/login',
    method: 'post',
    headers: {
      'Abp.TenantId': `${getTenantId()}`
    },
    data
  }).then(res => {
    return { code: '20000', data: res }
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })

export const changePassword = (data:any) =>
  request({
    url: '/services/app/User/ChangePassword',
    baseURL: 'http://localhost:21021/api',
    // url:'/users/login',
    method: 'post',
    headers: {
      'Abp.TenantId': `${getTenantId()}`
    },
    data
  }).then(res => {
    return { code: '20000', data: res }
  })
