import grace from '../../utils/grace'
import api from '../../utils/api'

grace.page({
  data:{
    videoId:1,
    videoData:null
  },
  onLoad(){
    this.queryData()
  },
  onShareAppMessage(res) { //转发给朋友
    return {
      title: this.$data.videoData.templateName,
      path: '/pages/beShared/index?id=' + this.$data.videoData.videoId,
      imageUrl: this.$data.videoData.templateMainImageUrl
    }
  },
  queryData(){
    this.$http.get(api.appOperation.getProductVideo,{
      videoId:this.$data.videoId
    }).then(res=>{
      console.log(res)
      this.$data.videoData = res
    })
  },
  startUpload(){
    wx.showLoading({
      title: '下载中...',
    })
    wx.downloadFile({
      url: this.$data.videoData.productVideoUrl,
      success(res){
        if(res.statusCode === 200){
          wx.showToast({
            title: '下载成功',
            icon:'success'
          })
        }
      },
      complete(){
        wx.hideLoading()
      }
    })
  }
})