// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    videoUrl:'',
    videoImg:'',
    acceptData:''
  },
  // 事件处理函数
  onReady() {
      this.videoContext = wx.createVideoContext('myVideo')
      let that=this
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('sendVideoUrlFinish', function (data) {
      let dataVal=JSON.parse(data.data);  
      that.setData({
        videoUrl:dataVal.tempFilePath,
        videoImg:dataVal.tempThumbPath,
        acceptData:dataVal
      })
      console.log(dataVal)
    })
  },
  startUpload(){
    console.log(this.data.videoUrl)
    wx.saveVideoToPhotosAlbum({
      filePath: this.data.videoUrl,
      success (res) {
        console.log('aaa')
      }
    })
    wx.showToast({
      title: '正在下载',
      icon: 'loading',
      duration: 3000
    })
  },
 videoErrorCallback(e) {
      console.log('视频错误信息:')
      console.log(e.detail.errMsg)
    },  
})
