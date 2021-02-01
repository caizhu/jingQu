
// index.js
// 获取应用实例

import grace from '../../utils/grace'
import api from '../../utils/api'
grace.page({
  data:{
    imgUrl:'../../images/1.jpg',
    user:null
  },
  onLoad(){
    this.$data.user = wx.getStorageSync('user')
  },
  getUserInfoHandler(e){
    const detail = e.detail
    this.$http.post(api.appUser.getWxInfo,{
      sessionKey:this.$data.user.sessionKey,
      encryptedData:detail.encryptedData,
      iv:detail.iv,
      openId:this.$data.user.openId
    }).then(res=>{
      wx.showToast({
        title: '授权成功',
      })
      wx.setStorageSync('user', res)
      this.$data.user = res
    })
  },
  getPhoneNumberHandler(e){
    const detail = e.detail
    this.$http.post(api.appUser.getWxPhone,{
      sessionKey:this.$data.user.sessionKey,
      encryptedData:detail.encryptedData,
      iv:detail.iv,
      openId:this.$data.user.openId
    }).then(res=>{
      wx.showToast({
        title: '授权成功',
      })
      wx.setStorageSync('user', res)
      wx.navigateBack({
        delta: 1,
      })
    })
  }
})

