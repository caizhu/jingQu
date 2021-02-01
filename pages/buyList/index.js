import grace from '../../utils/grace'
import api from '../../utils/api'

const app = getApp()
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
    app._showLoading()
    this.$http.post(api.appOperation.myOrders)
    .then(res=>{
      app._hideLoading()
      this.$data.orderList = res
      wx.stopPullDownRefresh()
    })
  },
  goToVideoShow(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/video/index?id='+id
    })
  }
})