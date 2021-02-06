import grace from '../../utils/grace'
import api from '../../utils/api'

const app = getApp()
grace.page({
  data:{
    user:null,
    listImg:'../../images/list.png',
    rightArrow:'../../images/arrow.png',
    editPen:'../../images/editPen.png',
  },
  onLoad(){
    this.getUserInfo()
  },
  goToBuyList(){
    wx.navigateTo({
      url: '/pages/buyList/index',
    })
  },
  getUserInfo(){
    app._showLoading()
    this.$http.get(api.appUser.getMyInfo).then(res=>{
      app._hideLoading()
      this.$data.user = res
      wx.setStorageSync('user', res)
    })
  },
  editUserInfoHandler(){
    wx.navigateTo({
      url: '/pages/myUserPage/index',
    })
  }
})
