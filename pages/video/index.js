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
    videoNumVal:null,
    finishVideoUrl:{"errCode":0,"errMsg":"openVideoEditor:ok","tempFilePath":"wxfile://clientdata/1610986560945.open_editor_video.mp4","tempThumbPath":"wxfile://clientdata/1610986560945.open_editor_thumb.jpg","duration":4156,"durationUs":4156000,"durationMs":4156,"durationS":4,"size":1114165}
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
        that.editVideo(videoUrl,key)        
      }
    })
  },
 editVideo(filePath,key){
    let that=this
    wx.openVideoEditor({
      filePath:filePath,
      success(val){         
        console.log(JSON.stringify(val));    
        that.setData({
          finishVideoUrl:JSON.stringify(val)
        })            
        // 传送到当前页面的数据{"errCode":0,"errMsg":"openVideoEditor:ok","tempFilePath":"wxfile://clientdata/1610986560945.open_editor_video.mp4","tempThumbPath":"wxfile://clientdata/1610986560945.open_editor_thumb.jpg","duration":4156,"durationUs":4156000,"durationMs":4156,"durationS":4,"size":1114165}
        if(val.durationS>10){
          wx.showModal({
              title: '提示',
              content: '视频时长大于10，请重新剪辑',
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  // that.selectVideo();
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
        }else{
          const state = "arrayList["+key+"].img"
          const dur = "arrayList["+key+"].duration"
          const videoUrl = "arrayList["+key+"].videoUrl"
          that.setData({
            [state]:val.tempThumbPath,
            [dur]:val.durationS,
            [videoUrl]:val.tempFilePath
          })
        }          
      }
    })
  },
  goToMakeVideo(){
    let that=this
    wx.navigateTo({
       url: '../videoShow/index',
       success: function (result) {
          result.eventChannel.emit('sendVideoUrlFinish', { data:JSON.stringify(that.data.finishVideoUrl)})
        }
    })
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
  }
})
