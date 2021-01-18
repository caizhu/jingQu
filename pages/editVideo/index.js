// index.js
// 获取应用实例
const app = getApp()
import grace from "../../grace/grace.js"
grace.page({
  data: {
    imgUrl:'../../images/video.jpg'
  },
  // 事件处理函数
  onLoad() {    
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendVideoUrlToNext', function (data) {
      let acceptData=data.data;
      wx.openVideoEditor({
        filePath:acceptData,
        success(val){         
          console.log(JSON.stringify(val));
          //向上个页面返回值
          eventChannel.emit('acceptDataFromOpenedPage',JSON.stringify(val))
          wx.navigateBack();
        }
      })
    })
  },
  // selectVideo(){
  //   wx.chooseVideo({
  //     sourceType: ['album','camera'],
  //     maxDuration: 60,
  //     camera: ['front', 'back'],
  //     compressed:false,
  //     success(res) {
  //       wx.openVideoEditor({
  //         filePath:res.tempFilePath,
  //         success(val){
  //           console.log(val)
  //         }
  //       })
  //       console.log(res.tempFilePath);
  //       // wxfile://tmp_4ad0cacf9a808f04c7e39ddc15885772380ba9c956adb2ee.mp4
  //     }
  //   })
  // },
})
