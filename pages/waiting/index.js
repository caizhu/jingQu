import grace from '../../utils/grace'
import api from '../../utils/api'

grace.page({
  data:{
    areaId:1,
    waitData:null,
    percent:0,
    duration:10,
    videoId:0
  },
  onLoad(options){
    this.$data.duration = options.duration
    this.$data.videoId = options.videoId
    this.queryDetail()
    const interval = setInterval(() => {
      this.$data.percent += parseInt((1/this.$data.duration)*100)
      if(this.$data.percent === 100){
        clearInterval(interval)
        wx.navigateTo({
          url: '/pages/videoShow/index?id='+this.$data.videoId,
        })
      }
    }, 1000);
  },
  queryDetail(){
    this.$http.get(api.appOperation.getWaitingVideo,{
      areaId:this.$data.areaId
    }).then(res=>{
      this.$data.waitData = res
    })
  }
})