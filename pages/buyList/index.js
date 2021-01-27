// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    userToken:'a',
    hidden: true, 
    scrollHeight: 0,
    page:1,
    arrayList: [],
    imgUrl:'http://xingleduh5.oss-cn-shenzhen.aliyuncs.com/images/2019-07-08/377154b31f8f49d79fd7de0fbfe8529e_20190708162243.png',    
    refreshAnimation:null,
    loading:false,
    triggered:false,
  },
  // 事件处理函数
  onLoad() {
    let that=this;
    wx.getSystemInfo({ 
      success: function (res) {     
        that.setData({
          scrollHeight: res.windowHeight 
      }); 
     }
    });      
},
onShow: function () { 
  this.getList(); 
}, 
onReachBottom: function () { //滚动到底部/右边时触发
  this.getList(); 
}, 
onPullDownRefresh () { 
  if (this._freshing) return
  this._freshing = true
  this.setData({ 
    arrayList:[],
    hidden: false
  });  
  setTimeout(() => {
    this.setData({
      triggered: false,
      hidden: true
    })
    this.data.arrayList.push({
      id:0,
      title:'珠海横琴星乐度●露营小镇',
      message: '星奇塔无动力世界',
      price:'10.34',
      date:'2021-01-10 10:11'
    }) 
    this._freshing = false
  }, 1000)  
  }, 
  getList(){         
    app.post.request('/api/appOperation/myOrders', {}).then(res => {
        console.log('responent', res)
    })
    this.setData({ 
      hidden: false
    });  
    for (var i =0; i < 10; i++) { 
      let a=this.data.arrayList.length;
      let array=this.data.arrayList;
      array.push({
        id:a,
        title:'珠海横琴星乐度●露营小镇海横琴长隆海洋王国珠海横琴长隆海洋王国',
        message: '星奇塔无动力世界',
        price:'10.34',
        date:'2021-01-10 10:11'
      })
      this.setData({
        arrayList:array
      })
    }
    setTimeout( () =>{
      this.setData({
        hidden:true
      })
    }, 2000)    
  },
  goToVideoShow: function () {
    wx.navigateTo({
      url: '../videoShow/index'
    })
  }
})
