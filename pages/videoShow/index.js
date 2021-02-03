import grace from '../../utils/grace'
import api from '../../utils/api'

const app = getApp()
grace.page({
  data: {
    videoId: 4,
    videoData: null
  },
  onLoad(options) {
    this.$data.videoId = options.id
    wx.showLoading({
      title: '正在制作中...',
      icon: 'loading'
    })
    const interval = setInterval(() => {
      if (this.$data.videoData && this.$data.videoData.productStatus === 2) {
        wx.hideLoading()
        clearInterval(interval)
      } else {
        this.queryDetail()
      }
    }, 1000);
  },
  onUnload() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  onShareAppMessage() { //转发给朋友
    return {
      title: this.$data.videoData.templateName,
      path: '/pages/beShared/index?id=' + this.$data.videoId,
      imageUrl: this.$data.videoData.templateMainImageUrl
    }
  },
  queryDetail() {
    this.$http.get(api.appOperation.getProductVideo, {
      videoId: this.$data.videoId
    }).then(res => {
      this.$data.videoData = res
    })
  },
  startUpload() {
    const that = this
    console.log(this.$data.videoData)
    if(this.$data.videoData.template.orderStatus === 0 && this.$data.videoData.template.publicPrice > 0){
      app._showLoading()
      this.$http.get(api.appOperation.buyVideo, {
        videoId: this.$data.videoId
      }).then(res => {
        console.log(res)
        app._hideLoading()
        console.log('微信支付', res)
        wx.requestPayment({
          nonceStr: res.nonceStr,
          package: res.package,
          paySign: res.paySign,
          signType: 'MD5',
          timeStamp: res.timeStamp,
          success() {
            app._showLoading()
            const interval = setInterval(() => {
              that.$http.get(api.appOperation.checkOrderPaymentStatus, {
                orderNo: res.orderNo
              }).then(r => {
                app._hideLoading()
                if (r.paymentStatus === 1) {
                  wx.showToast({
                    title: '支付成功',
                  })
                  let videoData = that.$data.videoData
                  videoData.template.orderStatus = 1
                  that.$data.videoData = JSON.parse(JSON.stringify(videoData))
                  clearInterval(interval)
                  that.downLoad()
                }
              })
            }, 200);
          },
          fail(err) {
            console.log(err)
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })
      })
    }else{
      that.downLoad()
    }
  },
  downLoad() {
    wx.showLoading({
      title: '下载中...',
    })
    wx.downloadFile({
      url: this.$data.videoData.productVideoUrl,
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          wx.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success(rr){
              console.log(rr)
              wx.showToast({
                title: '下载成功',
                icon: 'success'
              })
            },
            fail(err){
              console.log(err)
              wx.showToast({
                title: '下载失败',
                icon:'none'
              })
            }
          })
        }
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})