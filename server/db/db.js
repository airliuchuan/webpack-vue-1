const axios = require('axios')
const sha1 = require('sha1')

const className = 'test'

const request = axios.create({
  baseURL: `https://d.apicloud.com/mcm/api`
})

const createError = (code, res) => {
  const err = new Error(res.message)
  err.code = code
  return err
}

const handleRequest = ({data, status, ...rest}) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    // SHA1（应用ID + 'UZ' + 应用KEY +'UZ' + 当前时间毫秒数）+ '.' +当前时间毫秒数
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAll () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },
    async addOne (content) {
      return handleRequest(await request.post(
        `/${className}`,
        content,
        {headers: getHeaders()}
      ))
    },
    async getOne (id) {
      return handleRequest(await request.get(
        `/${className}/${id}`,
        {headers: getHeaders()}
      ))
    },
    async update (id, content) {
      return handleRequest(await request.put(
        `/${className}/${id}`,
        content,
        {headers: getHeaders()}
      ))
    },
    async delOne (id) {
      return handleRequest(await request.delete(`/${className}/${id}`, {
        headers: getHeaders()
      }))
    },
    async delAll (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/${className}/${id}`
        }
      })
      return handleRequest(await request.post(
        '/batch',
        {requests},
        {headers: getHeaders()}
      ))
    }
  }
}
