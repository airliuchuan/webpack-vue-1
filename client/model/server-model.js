import config from '../../app.config'
import createDb from '../../server/db/db'

const db = createDb(config.db.appId, config.db.appKey)

// 服务器端渲染基本都是获取数据, 而且一般只是首页
export default {
  getAll () {
    return db.getAll()
  }
}
