// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    imgUrl:'../../images/1.jpg',
    imgUser:'../../images/user.png'
  },
  onLoad() {
  },
  // 事件处理函数
  doVideo: function () {
    wx.navigateTo({
      url: '../video/index',
      events: {
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
      },
      success: function (res) {
        res.eventChannel.emit('videoListRow', { data: 'send from opener page1111' })
      }
    })
  }
})
