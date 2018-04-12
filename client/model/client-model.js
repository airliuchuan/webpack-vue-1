import axios from 'axios'

import {createError} from './util'

const request = axios.create({
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(res => {
      const data = res.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.succ) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch(err => { // 服务器包里(ctx.status)报的错会走axios的catch
      // axios的错误信息放在err.response里
      // console.log(err, err.response)
      const errRes = err.response
      if (errRes.status === 401) {
        reject(createError(401, errRes.data))
      }
    })
  })
}

export default {
  getAll () {
    return handleRequest(request.get('/api/all'))
  },
  login (username, password) {
    return handleRequest(request.post('/user/login', {username, password}))
  }
}
