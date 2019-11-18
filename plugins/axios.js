/*
 * @Author: Aaron
 * @Date: 2019-11-18 23:57:40
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 01:59:51
 * @Description: file content
 */
import { Message } from 'element-ui'
export default app => {
  const axios = app.$axios
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  // 返回回调
  axios.onResponse(res => {
    const result = res.data
    if (result.status !== 0) {
      Message.error(result.message)
    }
  })

  // 错误回调
  axios.onError(() => {
    Message.error('服务器错误，请稍后再试')
  })

  app.$get = (url, params) => axios.get(url, {params})
  app.$post = (url, data) => axios.post(url, {data})
  app.$put = (url, params) => axios.put(url, {params})
  app.$delete = (url, params) => axios.delete(url, {params})
}
