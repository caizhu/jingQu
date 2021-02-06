
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
  }
})

