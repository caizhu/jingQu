import Post from './utils/Post.js'
const post = new Post();
// app.js
App({
  post: post,
  onLaunch() {
    console.log('初始化')
    // 登录    
    wx.login({
      success: res => {
        console.log('login'+JSON.stringify(res))
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://119.45.195.136:8000/api/appUser/wxLogin',
          method: 'POST',
          data:{
            loginCode:res.code
          },
          success: suc => {
            console.log('login'+JSON.stringify(suc))
            //将token和uid存在本地
            let { token,uid}=res.data;
            wx.setStorageSync('token', token)
            wx.setStorageSync('uid', uid)
          }
        })
      }
    })    
  },
  globalData: {
    api:'http://119.45.195.136:8000',// Config.api,
    userInfo: null
  }
})


    // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       console.log('getSetting'+JSON.stringify(res))
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })