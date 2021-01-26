// app.js
import Post from './utils/Post.js' 
const post = new Post();
App({
  post: post,
  onLaunch() {   
    console.log('初始化')
    wx.login({
      success: res => {
        console.log('login：'+JSON.stringify(res.code))
        wx.request({
            url: 'http://119.45.195.136:8000/api/appUser/wxLogin',
             method: 'POST',
             header:{
              'content-type':'application/json'
             },
             data:{
               loginCode:res.code
             },
             success: suc => {
              console.log('获取token值：'+suc.data.userToken)
              //将token和uid存在本地
               wx.setStorageSync('token',suc.data.userToken)
            }
          })
       }
    })
  },
  globalData: {
    api:'http://119.45.195.136:8000',// Config.api,
    userInfo: null
  }
})