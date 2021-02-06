import grace from '../../utils/grace'

grace.page({
  data:{
    user:null,
    listImg:'../../images/list.png',
    rightArrow:'../../images/arrow.png',
    editPen:'../../images/editPen.png',
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
