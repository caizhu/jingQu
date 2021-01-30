// app.js
import grace from './utils/grace'
import api from './utils/api'

App({
  onLaunch() {
    wx.login({
        success:(res)=>{
            grace.http.post(api.appUser.wxLogin,{
                loginCode:res.code
            }).then((r)=>{
                wx.setStorageSync('token',r.userToken)
                wx.setStorageSync('sessionKey',r.sessionKey)
                wx.setStorageSync('openId',r.openId)
            })
        }
    })
  },
globalData:{
      userInfo:null
    }
})
