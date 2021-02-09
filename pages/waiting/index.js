import grace from '../../utils/grace'
import api from '../../utils/api'

const app = getApp()
grace.page({
  data:{
    imgUrl:'../../images/logo.png',
    areaId:1,
    waitData:null,
    percent:0,
    duration:10,
    videoId:0
  },
  onLoad(options){
    this.$data.areaId = options.areaId
    this.$data.duration = parseInt(options.duration) * 4
    this.$data.videoId = options.videoId
    this.queryDetail()
    const interval = setInterval(() => {
      this.$data.percent += parseInt((1/this.$data.duration)*100)
      if(this.$data.percent >= 100){
        clearInterval(interval)
        wx.redirectTo({
          url: '/pages/videoShow/index?id='+this.$data.videoId,
        })
      }
    }, 1000);
  },
  queryDetail(){
    app._showLoading()
    this.$http.get(api.appOperation.getWaitingVideo,{
      areaId:this.$data.areaId
    }).then(res=>{
      app._hideLoading()
      this.$data.waitData = res
    })
  }
})