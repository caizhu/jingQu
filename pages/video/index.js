// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    imgUrl:'../../images/1.jpg',
    playUrl:'../../images/play.png',
  },
  onLoad: function (option) {
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', { data: 'send from opened page' });
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
    })
  },
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onShareAppMessage() {
    return {
      title: 'video',
      path: 'page/component/pages/video/video'
    }
  },
  // 事件处理函数
  bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})
