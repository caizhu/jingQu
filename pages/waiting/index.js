import grace from '../../utils/grace'
import api from '../../utils/api'

const app = getApp()
grace.page({
  data:{
    imgUrl:'../../images/logo.png',
    percent:0,
    duration:10,
    videoId:120
  },
  onLoad(options){
    var that = this
    this.$data.duration = parseInt(options.duration) * 4
    this.$data.videoId = options.videoId || 120
    const interval = setInterval(() => {
      this.$data.percent += parseInt((1/this.$data.duration)*100)
      if(this.$data.percent >= 100){
        clearInterval(interval)
        
      }
    }, 1000);

    const interval2 = setInterval(() => {
      that.$http.get(api.appOperation.checkVideoStatus,{
        videoId:that.$data.videoId
      }).then(res=>{
        if(res.productStatus === 2){
          clearInterval(interval2)
          wx.redirectTo({
            url: '/pages/videoShow/index?id='+this.$data.videoId,
          })
        }
      })
    }, 3000);
  }
})