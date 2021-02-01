
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
    this.$data.getStorageSync('user')
  },
  getUserInfoHandler(e){
    const detail = e.detail
    this.$http.post(api.appUser.getWxInfo,{
      sessionKey:user.sessionKey,
      encryptedData:detail.encryptedData,
      iv:detail.iv,
      openId:this.$data.user.openId
    }).then(res=>{
      console.log(res)
      wx.setStorageSync('user', res)
    })
  },
  getPhoneNumberHandler(){
    const detail = e.detail
    this.$http.post(api.appUser.getWxInfo,{
      sessionKey:user.sessionKey,
      encryptedData:detail.encryptedData,
      iv:detail.iv,
      openId:this.$data.user.openId
    }).then(res=>{
      console.log(res)
      wx.setStorageSync('user', res)
      wx.navigateBack({
        delta: 1,
      })
    })
  }
})

