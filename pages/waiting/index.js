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
  },
 videoErrorCallback(e) {
      console.log('视频错误信息:')
      console.log(e.detail.errMsg)
    },  
  bindactiveendBtn(){
    console.log('视频已制作完成')
  }
})
