// index.js
// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'

grace.page({
  data:{
    imgUrl:'../../images/1.jpg',
    imgUser:'../../images/user.png'
  },
  onLoad(){
    this.queryData()
  },
  queryData(){
    this.$http.post(api.appOperation.areaIndex,{
      areaCode:'changlong'
    }).then(res=>{
      console.log(res)
    })
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
      url: '/pages/myCenter/index'
    })
  }
})
