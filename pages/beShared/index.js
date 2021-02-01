import grace from '../../utils/grace'
import api from '../../utils/api'

grace.page({
  data:{
    videoId:1,
    videoData: null
  },
  onLoad(options){
    this.queryData()
  },
  onShareAppMessage() { //转发给朋友
    return {
      title: this.$data.videoData.templateName,
      path: '/pages/beShared/index?id=' + this.$data.videoId,
      imageUrl: this.$data.videoData.templateMainImageUrl
    }
  },
  queryData(){
    this.$http.get(api.appOperation.getProductVideo,{
      videoId:this.$data.videoId
    }).then(res=>{
      this.$data.videoData = res
    })
  },
  templateDetailHandler(){
    wx.navigateTo({
      url: '/pages/video/index?id='+this.$data.videoData.templateId,
    })
  }
})