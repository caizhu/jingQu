// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    imgUrl:'../../images/1.jpg',
    playUrl:'../../images/play.png',
    peopleImg:'../../images/people.jpg',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
})
