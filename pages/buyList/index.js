// index.js
// 获取应用实例
const app = getApp()
import grace from "../../grace/grace.js"
grace.page({
  data: {
    array: [{
      id:1,
      title:'珠海横琴长隆海洋王国珠海横琴长隆海洋王国珠海横琴长隆海洋王国',
      message: '珠海长隆海洋王国',
      price:'10.34',
      date:'2021-01-10 10:11'
    }, {
      id:2,
      title:'珠海横琴长隆海洋王国珠海横琴长',
      message: '珠海长隆海洋王国',
      price:'￥444.34',
      date:'2021-01-10 10:11'
    }],
    imgUrl:'../../images/2.jpg',    
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  showToastBtn: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 4000
    })
  },
  showModelBtn: function () {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },  
  onPullDownRefresh: function () {    
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let newwords = [{
      id:3,
      title:'珠海横琴长国',
      message: '珠海长隆海洋王国',
      price:'10.34',
      date:'2021-01-10 10:11'
    },{
      id:3,
      title:'珠海横琴长国',
      message: '珠海长隆海洋王国',
      price:'10.34',
      date:'2021-01-10 10:11'
    },{
      id:3,
      title:'珠海横琴长国',
      message: '珠海长隆海洋王国',
      price:'10.34',
      date:'2021-01-10 10:11'
    },{
      id:3,
      title:'珠海横琴长国',
      message: '珠海长隆海洋王国',
      price:'10.34',
      date:'2021-01-10 10:11'
    }].concat(this.data.array);
    setTimeout( ()=> {
      this.setData({
        array: newwords
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
     }, 2000)
  },
  onReachBottom:function(){
    console.log('hi')
    if (this.data.loading) return;
    this.setData({ loading: true });
    updateRefreshIcon.call(this);
    var newwords = this.data.array.concat([{
        id:4,
        title:'珠海横琴长国',
        message: '珠海长隆海洋王国',
        price:'111110.34',
        date:'2021-01-10 10:11'
      }
    ]);
    setTimeout( () =>{
      this.setData({
       loading: false,
       array: newwords
      })
    }, 2000)
   },
   updateRefreshIcon() {
    var deg = 0;
    console.log('旋转开始了.....')
    var animation = wx.createAnimation({
     duration: 1000
    });
    var timer = setInterval( ()=> {
     if (!this.data.loading)
      clearInterval(timer);
     animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
     deg += 360;
     this.setData({
      refreshAnimation: animation.export()
     })
    }, 2000);
   },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
