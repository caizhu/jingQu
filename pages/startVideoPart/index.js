// index.js
// 获取应用实例
const app = getApp()
import grace from "../../grace/grace.js"
grace.page({
  data: {
    imgUrl:'../../images/video.jpg'
  },
  // 事件处理函数
  startVideoShow: function () {
    wx.navigateTo({
      url: '../video/index'
    })
  },
})
