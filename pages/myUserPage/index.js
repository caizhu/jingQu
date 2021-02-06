
// index.js
// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'
const app = getApp()
grace.page({
  data:{
    wxPhone:'../../images/phone.png',
    user: null
  },
  onLoad(){
    this.getUserInfo()
  },
  getUserInfo(){
    app._showLoading()
    this.$http.get(api.appUser.getMyInfo).then(res=>{
      app._hideLoading()
      this.$data.user = res
      wx.setStorageSync('user', res)
    })
  }
})

