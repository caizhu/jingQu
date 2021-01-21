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
  //     let that=this
  //     const eventChannel = this.getOpenerEventChannel()
  //     eventChannel.on('sendVideoUrlFinish', function (data) {
  //     let dataVal=JSON.parse(data.data);  
  //     that.setData({
  //       videoUrl:dataVal.tempFilePath,
  //       videoImg:dataVal.tempThumbPath,
  //       acceptData:dataVal
  //     })
  //     console.log(dataVal)
  //   })
  },
  onShareAppMessage (res) {  //转发给朋友
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '../beShared/index',
      imageUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3871678567,2844469471&fm=26&gp=0.jpg'
    }
  },
  onShareTimeline: function () {  //分享到朋友圈
    //用于自定义分享内容，不支持自定义页面路径
    return {
      title: '自定义转发标题',
      query: 'a=1&b=2',
      imageUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3871678567,2844469471&fm=26&gp=0.jpg'
    }
  },
  startUpload(){
    wx.showToast({
      title: '正在下载',
      icon: 'loading',
      duration: 2000
    })
    wx.saveVideoToPhotosAlbum({
      filePath: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      success (res) {
        wx.showToast({
          title: '下载成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail(res){
        console.log(JSON.stringify(res))
        wx.showToast({
          title: '下载失败：'+res.errMsg,
          icon: 'error',
          duration: 2000
        })
      }
    })
 
  },
 videoErrorCallback(e) {
      console.log('视频错误信息:')
      console.log(e.detail.errMsg)
    },  
})
