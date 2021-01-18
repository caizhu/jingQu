// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {    
    arrayList:[{
      imgUrl:'../../images/add.png',
      img:'',
      duration:0,
      videoUrl:''
    },{
      imgUrl:'../../images/add.png',
      img:'',
      duration:0,
      videoUrl:''
    }],
    videoNumVal:null
  },
  onLoad: function (option) {
  },
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  
  // 删除选择视频
  deleVideoBtn(event){
    let key=event.currentTarget.dataset.index;    
    const state = "arrayList["+key+"].img"
    const dur = "arrayList["+key+"].duration"
    this.setData({
      [state]:'',
      [dur]:0
    })
  },
  // 选择视频
  selectVideo(event){
    let that=this;
    // 绑定方法中传过来的参数值 //用于设置第几个视频
    let key=event.currentTarget.dataset.index;    
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
              let list=JSON.parse(data);
              console.log('传送到当前页面的数据'+data)
              // 传送到当前页面的数据{"errCode":0,"errMsg":"openVideoEditor:ok","tempFilePath":"wxfile://clientdata/1610986560945.open_editor_video.mp4","tempThumbPath":"wxfile://clientdata/1610986560945.open_editor_thumb.jpg","duration":4156,"durationUs":4156000,"durationMs":4156,"durationS":4,"size":1114165}
              const state = "arrayList["+key+"].img"
              const dur = "arrayList["+key+"].duration"
              that.setData({
                [state]:list.tempThumbPath,
                [dur]:list.durationS
              })
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
