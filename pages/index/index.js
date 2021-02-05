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
    },
    areaCode:null
  },
  onLoad(options){
    if(options.areaCode){
      this.$data.areaCode = options.areaCode
      wx.setStorageSync('areaCode',this.$data.areaCode)
    }else if(wx.getStorageSync('areaCode')){
      this.$data.areaCode = wx.getStorageSync('areaCode')
    }else{
      this.$data.areaCode = 'zhxld'
    }
    
    const interval = setInterval(()=>{ 
      if(wx.getStorageSync('token')){
        clearInterval(interval)
        this.queryData()
      }
    },100)
  },
  onPullDownRefresh(){
    this.queryData()
  },
  queryData(){
    app._showLoading()
    this.$http.get(api.appOperation.areaIndex,{
      areaCode:this.$data.areaCode
    }).then(res=>{
      app._hideLoading()
      wx.stopPullDownRefresh()
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
