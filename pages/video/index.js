// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'
const app = getApp()
grace.page({
  data: {
    id: 1,
    detail: null,
    videoPartList: []
  },
  onLoad(options) {
    this.$data.id = options.id
    setTimeout(() => {
      this.loadDetail()
    }, 1000);
  },
  onShareAppMessage(res) { //转发给朋友
    return {
      title: this.$data.detail.templateName,
      path: '/pages/beShared/index?id=' + this.$data.id,
      imageUrl: this.$data.detail.mainImageUrl
    }
  },
  loadDetail() {
    this.$http.get(api.appOperation.queryTemplate, {
      templateId: this.$data.id
    }).then(res => {
      this.$data.detail = res
      this.$data.videoPartList = res.appTemplatePartVOList
    })
  },
  chooseVideoHandler(e) {
    if (this.$data.detail.orderStatus === 0) {
      return
    }
    const index = e.currentTarget.dataset.index
    const duration = this.$data.videoPartList[index].partDuration
    const that = this
    wx.chooseVideo({
      camera: ['camera', 'album'],
      maxDuration: duration,
      success: (res) => {
        const path = res.tempFilePath
        if (res.duration > duration) {
          that.editPhoto(index, duration, path)
        } else {
          let videoList = this.$data.videoPartList
          videoList[index].sourceVideoUrl = res.tempFilePath
          videoList[index].duration = parseInt(res.duration)
          that.$data.videoPartList = JSON.parse(JSON.stringify(videoList))
        }
      },
      faile: (err) => {
        console.log(err)
        wx.showToast({
          title: '获取视频失败',
        })
      }
    })
  },
  editPhoto(index, duration, path) {
    const that = this
    wx.showModal({
      title: '提示',
      content: `视频段落时长超过${duration}秒，是否需要裁剪，否则不允许使用`,
      success(res) {
        if (res.confirm) {
          wx.openVideoEditor({
            filePath: path,
            success: (res) => {
              const tempDuration = parseInt(res.duration / 1000)
              if (tempDuration > duration) {
                that.editPhoto(index, duration, res.tempFilePath)
              } else {
                let videoList = that.$data.videoPartList
                videoList[index].sourceVideoUrl = res.tempFilePath
                videoList[index].duration = parseInt(res.duration)
                that.$data.videoPartList = JSON.parse(JSON.stringify(videoList))
              }
            }
          })
        }
      }
    })
  },
  makeVideoHandler() {
    if (app.checkLoginStatus()) {
      const that = this
      if (this.$data.detail.orderStatus === 0 && this.$data.detail.publicPrice > 0) {
        this.$http.get(api.appOperation.buyTemplate, {
          templateId: this.$data.id
        }).then(res => {
          console.log('微信支付', res)
          wx.requestPayment({
            nonceStr: res.nonceStr,
            package: res.package,
            paySign: res.paySign,
            signType: 'MD5',
            timeStamp: res.timeStamp,
            success(rr) {
              const interval = setInterval(() => {
                that.$http.get(api.appOperation.checkOrderPaymentStatus, {
                  orderNo: res.orderNo
                }).then(r => {
                  if (r.paymentStatus === 1) {
                    wx.showToast({
                      title: '支付成功',
                    })
                    clearInterval(interval)
                    that.loadDetail()
                  }
                })
              }, 200);
            },
            fail(err) {
              console.log(err)
              wx.showToast({
                title: '支付失败'
              })
            }
          })
        })
      } else {
        wx.requestSubscribeMessage({
          tmplIds: ['S-Lhv93FTvSxfyObEv_R3CcXbB5eKvkaGgTLZIhv4xQ'],
          success(res) {
            wx.showLoading({
              title: '上传中',
              icon:'loading'
            })
            let videoArray = []
            console.log('已购买')
            Promise.all(
              that.$data.videoPartList.map(item => {
                return new Promise(async (resolve, reject) => {
                  if (item.partType === 1) {
                    const sourceVideoUrl = item.sourceVideoUrl
                    const fileName = await that.getUploadSign(sourceVideoUrl)
                    videoArray.push({
                      duration: Number(item.duration),
                      videoPartId: item.partId,
                      videoUrl: fileName
                    })
                  }
                  resolve()
                })
              })
            ).then(() => {
              that.$http.post(api.appOperation.submitVideoPart, {
                userVideoPart: videoArray.length,
                orderId: that.$data.detail.orderId,
                userVideoPartVOList: videoArray
              }).then(res => {
                wx.hideLoading()
                wx.navigateTo({
                  url: `/pages/waiting/index?duration=${that.$data.detail.videoDuration}&videoId=${res}&areaId=${that.$data.detail.areaId}`,
                })
              })
            })
          }
        })
      }
    }
  },
  deleVideoHandler(e) {
    const index = e.currentTarget.dataset.index
    let videoList = this.$data.videoPartList
    videoList[index].sourceVideoUrl = null
    this.$data.videoPartList = JSON.parse(JSON.stringify(videoList))
  },
  getUploadSign(sourceVideoUrl) {
    return new Promise((resolve, reject) => {
      this.$http.get(api.appOperation.getUploadPolicy, {
        uploadType: 1
      }).then(res => {
        const fileName = `${res.dir}/${new Date().getTime()}.mp4`
        wx.uploadFile({
          filePath: sourceVideoUrl,
          name: 'file',
          url: res.host,
          formData: {
            'signature': res.signature,
            'policy': res.policy,
            'OSSAccessKeyId': res.OSSAccessKeyId,
            'key': fileName
          },
          success(result) {
            resolve(fileName)
          },
          fail(err) {
            console.log(err)
            wx.showToast({
              title: '上传视频失败',
            })
          }
        })
      }).catch(e => {
        reject()
      })
    })
  }
})