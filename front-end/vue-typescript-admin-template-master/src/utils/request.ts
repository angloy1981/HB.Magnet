import axios from 'axios'
import { Message } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { getTenantId } from '@/utils/cookies'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // console.log("TestmModule Name",TestmModule.name)
    // console.log("UserModule token",UserModule.token)
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token
      config.headers.Authorization = 'Bearer ' + UserModule.token
      config.headers.Authorization = 'Bearer ' + UserModule.token
      config.headers['Abp.TenantId'] = getTenantId()
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    // console.log(response.data.error.message)
    if (res.code !== 20000 && res.success !== true) {
      Message({
        message: res.error.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm(
      //     '你已被登出，可以取消继续留在该页面，或者重新登录',
      //     '确定登出',
      //     {
      //       confirmButtonText: '重新登录',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     UserModule.ResetToken()
      //     location.reload() // To prevent bugs from vue-router
      //   })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    Message({
      message: error.response === undefined ||
      error.response.data === undefined ||
      error.response.data.error === undefined ||
      error.response.data.error.message === null
        ? error.message
        : error.response.data.error.message + ' ' + (error.response.data.error.details !== undefined ? error.response.data.error.details : ''),
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
