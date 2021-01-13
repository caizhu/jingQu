// index.js
// 获取应用实例
const app = getApp()
import grace from "../../grace/grace.js"
grace.page({
  data: {
    imgUrl:'../../images/2.jpg'
  },
  // 事件处理函数
  onLoad() {    
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
      }
    })
      // wx.openVideoEditor({
      //   filePath:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      //   success: (res) => {
      //     console.log(res);
      //   }
      // })
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
