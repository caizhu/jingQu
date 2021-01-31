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
  goToVideoShow(){
    wx.navigateTo({
      url: '/pages/videoShow/index',
    })
  }
})