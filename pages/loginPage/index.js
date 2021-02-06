
// index.js
// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'
const app = getApp()
grace.page({
  data:{
  },
  onLoad(){
    this.$data.user = wx.getStorageSync('user')
  },
  
})

