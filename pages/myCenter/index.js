import grace from '../../utils/grace'

grace.page({
  data:{
    user:null,
    listImg:'../../images/share.png',
    rightArrow:'../../images/arrow.png',
    motto: 'Hello World',
  },
  onLoad(){
    this.$data.user = wx.getStorageSync('user')
  },
  goToBuyList(){
    wx.navigateTo({
      url: '/pages/buyList/index',
    })
  }
})
