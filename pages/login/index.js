
// index.js
// 获取应用实例

import grace from '../../utils/grace'
import api from '../../utils/api'
grace.page({
  data:{
    imgUrl:'../../images/1.jpg',
  },
  onLoad(){},
  getUserInfoHandler(e){
    const detail = e.detail
    console.log(detail)
    this.$http.post(api.appUser.getWxInfo,{
      sessionKey:wx.getStorageSync('sessionKey'),
      encryptedData:detail.encryptedData,
      iv:detail.iv,
      openId:wx.getStorageSync('openId')
    }).then(res=>{
      console.log(res)
    })
  }
})

