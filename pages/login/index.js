
// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    imgUrl:'../../images/1.jpg',
    withCredentials: true,
    lang: 'zh_CN'
  },
  // 事件处理函数
  loginSuccess: function (res) {
    console.log(res.detail);
  },
  loginFail: function (res) {
    console.log(res);
  }
})
