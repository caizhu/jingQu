// index.js
// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'

const app = getApp()
grace.page({
  data:{
    imgUrl:'../../images/1.jpg',
    imgUser:'../../images/user.png',
    areaData: {
      appTemplateVOList:[],
      areaAdVo: null,
      areaAdVoList:[],
      areaVo:null
    }
  },
  onLoad(){
    const interval = setInterval(()=>{
      if(wx.getStorageSync('token')){
        clearInterval(interval)
        this.queryData()
      }
    },100)
  },
  queryData(){
    this.$http.get(api.appOperation.areaIndex,{
      areaCode:'abcd'
    }).then(res=>{
      this.$data.areaData = res
    })
  },
  // 事件处理函数
  videoHandler: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/video/index?id=${id}`
    })
  },
  goToUserCenter(){
    if(app.checkLoginStatus()){
      wx.navigateTo({
        url: '/pages/myCenter/index'
      })
    }
  }
})
