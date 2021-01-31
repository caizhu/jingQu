import grace from '../../utils/grace'
import api from '../../utils/api'

grace.page({
  data:{
    orderList:[]
  },
  onLoad(){
    this.loadList()
  },
  onPullDownRefresh(){
    this.loadList()
  },
  loadList(){
    this.$http.post(api.appOperation.myOrders)
    .then(res=>{
      this.$data.orderList = res
      wx.stopPullDownRefresh()
    })
  },
  goToVideoShow(e){
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/video/index?id='+id
    })
  }
})