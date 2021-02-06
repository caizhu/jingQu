
// index.js
// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'
const app = getApp()
grace.page({
  data:{
    wxPhone:'../../images/phone.png',
    phone:null,
    code: null
  },
  onLoad(){
    this.$data.user = wx.getStorageSync('user')
  },
  inputChangeHandler(e){
    const key = e.currentTarget.dataset.key
    this.$data[key] = e.detail.value
  },
  bindHandler(){
    if(!this.$data.phone){
      return wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
    }
    if(!this.$data.code){
      return wx.showToast({
        title: '验证码不能为空',
        icon:'none'
      })
    }
  }
  
})

