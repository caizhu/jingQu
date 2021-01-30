// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    imgUrl:'../../images/1.jpg',
    imgUser:'../../images/user.png'
  },
  onLoad(options) {
    // var url = decodeURIComponent(options.q); //扫普通链接二维码打开小程序
  //   app.post.request('/api/appOperation/areaIndex', {
  //     areaCode:url
  //   }).then(res => {
  //     console.log('首页responent', res)
  // })
  },
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
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
  },
  goToUserCenter(){
    wx.navigateTo({
      url: '../myCenter/index'
    })
  }
})
