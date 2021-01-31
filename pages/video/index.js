// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'

grace.page({
  data:{
    id:1,
    detail:null,
    videoPartList:[]
  },
  onLoad(options){
    this.$data.id = options.id || 1
    this.loadDetail()
  },
  onShareAppMessage (res) {  //转发给朋友
    return {
      title: this.$data.detail.templateName,
      path: '/pages/beShared/index?id='+this.$data.id,
      imageUrl:this.$data.detail.mainImageUrl
    }
  },
  loadDetail(){
    this.$http.get(api.appOperation.queryTemplate,{
      templateId:this.$data.id
    }).then(res=>{
      this.$data.detail = res
      this.$data.videoPartList = res.appTemplatePartVOList
    })
  },
  chooseVideoHandler(e){
    wx.chooseVideo({
      camera: ['camera','album'],
      maxDuration:2,
      success:(res)=>{
        console.log(res)
      },
      faile:(err)=>{
        console.log(err)
        wx.showToast({
          title: '获取视频失败',
        })
      }
    })
  },
  makeVideoHandler(){
    this.$http.get(api.appOperation.buyTemplate,{
      templateId:this.$data.id
    }).then(res=>{

    })
  }
})
