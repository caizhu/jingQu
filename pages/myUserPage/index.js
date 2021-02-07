
// index.js
// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'
const app = getApp()
grace.page({
  data:{
    wxPhone:'../../images/phone.png',
    user: null
  },
  onShow(){
    this.getUserInfo()
  },
  getUserInfo(){
    app._showLoading()
    this.$http.get(api.appUser.getMyInfo).then(res=>{
      app._hideLoading()
      this.$data.user = res
      wx.setStorageSync('user', res)
    })
  },
  updatePhoneHandler(){
    wx.navigateTo({
      url: '/pages/bindPhoneNum/index',
    })
  },
  getPhoneHandler(e){
    const detail = e.detail
    app._showLoading()
    this.$http.post(api.appUser.getWxPhone,{
      sessionKey:this.$data.user.sessionKey,
      encryptedData:detail.encryptedData,
      iv:detail.iv,
      openId:this.$data.user.openId
    }).then(res=>{
      app._hideLoading()
      wx.showToast({
        title: '授权成功',
      })
      wx.setStorageSync('user', res)
      this.$data.user = res
    })
  },
  updateUserImg(){
    const that = this
    wx.chooseImage({
      count:1,
      sourceType:['album','camera'],
      success:async (res)=>{
        const tempFilePaths = res.tempFilePaths[0]
        wx.showLoading({
          title: '加载中...',
          icon:'loading'
        })
        const imgUrl = await that.getUploadSign(tempFilePaths)
        that.$http.post(api.appUser.updateMySelf,{
          avatarPath:imgUrl
        }).then(res=>{
          app._hideLoading()
          wx.showToast({
            title: '修改成功',
            icon:'success'
          })
          that.getUserInfo()
        })
      }
    })
  },
  getUploadSign(sourceVideoUrl) {
    return new Promise((resolve, reject) => {
      this.$http.get(api.appOperation.getUploadPolicy, {
        uploadType: 2
      }).then(res => {
        const fileName = `${res.dir}/${new Date().getTime()}.png`
        wx.uploadFile({
          filePath: sourceVideoUrl,
          name: 'file',
          url: res.host,
          formData: {
            'signature': res.signature,
            'policy': res.policy,
            'OSSAccessKeyId': res.OSSAccessKeyId,
            'key': fileName
          },
          success(result) {
            resolve(fileName)
          },
          fail(err) {
            console.log(err)
            wx.showToast({
              title: '上传失败',
              icon:'none'
            })
          }
        })
      }).catch(e => {
        reject()
      })
    })
  }
})

