export default class Post {
  constructor() { } 
  request = (path, data) => {
    let app = getApp(),
      url = `${app.globalData.api}${path}`,
      header = {
        token: wx.getStorageSync('user').token || '',
        'content-type': 'application/x-www-form-urlencoded'
      }
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: "POST",
        header: header,
        success(res) {
          console.log('res 响应拦截', res.data.code)
          if (res.data.code == 17000) {
            wx.showModal({
              title: '提示',
              content: '授权已过期或未授权！请重新授权！',
              showCancel: true,
              cancelText: "返回首页",
              confirmText: "去授权",
              success: (res) => {
                res.cancel ?
                  wx.switchTab({
                    url: '../index/index',
                  }) :
                  wx.navigateTo({
                    url: '../login/index',
                  })
              },
              fail: res => { }
            })
          }
          return resolve(res)
        },
        fail: reject
      })
    });
    return promise;
  }
}
