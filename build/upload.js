// 1. 引入七牛sdk
const qiniu = require('qiniu')
// 2. 会用到文件操作
const fs = require('fs')
const path = require('path')
const cdnConfig = require('../app.config').cdn
const {ak, sk, bucket} = cdnConfig

const mac = new qiniu.auth.digest.Mac(ak, sk)
var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

// 上传文件的逻辑
const doUpload = (key, file) => {
  var options = {
    // 覆盖上传
    scope: bucket + ":" + key
  }
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if(err) {
        return reject(err)
      }
      if (info.statusCode === 200) {
        resolve(body)
        console.log(body)
      } else {
        reject(body)
      }
    })
  })
}

const publicPath = path.join(__dirname, '../public')
// 递归上传所有文件

const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    // 1. 拿到完整的路径
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file

    // 2. 判断是否是文件夹
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }

    doUpload(key, filePath)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  })
}

uploadAll(publicPath)
