// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {    
    arrayList:[{
      imgUrl:'../../images/add.png',
      videoUrl:''
    },{
      imgUrl:'../../images/add.png',
      videoUrl:''
    }],
    videoNumVal:null
  },
  onLoad: function (option) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('videoListRow', function (data) {
      console.log(data)
    })
  },
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  // 事件处理函数
  selectVideo(event){
    // 绑定方法中传过来的参数值 
    this.videoNumVal=event.currentTarget.dataset.index;    
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      compressed:false,
      success(res) {        
        let videoUrl= res.tempFilePath;
        wx.navigateTo({
          url: '../editVideo/index',
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function(data) {
              console.log(data)
            }
          },
          success: function (result) {
            console.log('视频地址'+JSON.stringify(videoUrl));
            result.eventChannel.emit('sendVideoUrlToNext', { data: videoUrl})
          }
        })
      }
    })
  },
  goToMakeVideo(){
    wx.showToast({
      title: '正在玩命制作中',
      icon: 'loading',
      duration: 3000
    });
    wx.navigateTo({
      url: '../videoShow/index'
    })
  }
})
