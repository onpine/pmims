import axios from "axios";
import router from "@/router";
import { message } from "ant-design-vue";

const request = axios.create({
  baseURL: "http://zinchon.com:337"
});
// 请求拦截器
request.interceptors.request.use(
  // 任何所有请求都会经过这里
  // config 时当前请求相关的配置信息对象
  // config 是可以修改的
  function (config: any) {
    const token = window.localStorage.getItem('token')
    // 如果又有用户登录信息，则统一设置token
    if (token) {
      config.headers.Authorization = token
    }

    // 当这里 return config 之后请求才会真正的发出去
    return config
  },
  // 请求失败会经过这里
  function (error: any) {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(function (response: any) {
  // 所有响应码为 2xx 的都会进入这里
  return response
}, function (error: any) {
  const status = error.response.status
  // 任何超出 2xx 的响应码都会进入这里
  if (error.response && status === 401) {
    // 清除本地存储中的用户登陆状态
    // 跳转到登陆页面
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('token')
    router.push('/login')
    message.error('登录状态无效')
  } else if (status === 403) {
    message.warning("没有操作权限");

  } else if (status === 400) {
    message.error('请求参数错误，请检查参数')
  } else if (status >= 500) {
    message.error('服务端内部异常，请稍后重试')
  }
  return Promise.reject(error)
})

export default request;
