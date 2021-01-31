// app.js
import grace from './utils/grace'
import api from './utils/api'

App({
  onLaunch() {
    wx.login({
      success: (res) => {
        grace.http.post(api.appUser.wxLogin, {
          loginCode: res.code
        }).then((r) => {
          wx.setStorageSync('token', r.userToken)
          wx.setStorageSync('user', r)
        })
      }
    })
  },
  globalData: {},
  checkLoginStatus(){
    const user = wx.getStorageSync('user')
    if(!user){
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }else{
      return true
    }
  }
})