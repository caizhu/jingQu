import grace from './grace-min'


grace.http.config.baseURL = 'https://video.haiwang.cool/'
grace.http.config.timeout = 10000;
grace.http.interceptors.request.use(
  (request)=>{
    wx.showLoading({
      title: '加载中...',
    })
    if(wx.getStorageSync('token')){
      request.headers['Authorization'] = "Bearer "+wx.getStorageSync('token')
    }
    request.headers['content-type'] = 'application/json'
    return request
  }
)

grace.http.interceptors.response.use(
  (response,promise)=>{
    wx.hideLoading()
    if(response.status == 200){
      return promise.resolve(response.data||'')
    }
  },
  (err,promise)=>{
    wx.hideLoading()
    if(err.status === 401){
      wx.removeStorageSync('token')
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return promise.reject()
    }else{
      console.log(err)
      wx.showToast({
        title: err.response.data.message,
        icon:'none'
      })
      return promise.reject()
    }
  }
)

export default grace
