// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'
const app = getApp()
grace.page({
  data: {
    id: 1,
    detail: null,
    videoPartList: [],
    firstClick:true
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
      path: '/pages/video/index?id=' + this.$data.id,
      imageUrl: this.$data.detail.mainImageUrl
    }
  },
  loadDetail() {
    app._showLoading()
    this.$http.get(api.appOperation.queryTemplate, {
      templateId: this.$data.id
    }).then(res => {
      app._hideLoading()
      this.$data.detail = res
      this.$data.videoPartList = res.appTemplatePartVOList
    })
  },
  chooseVideoHandler(e) {
    const index = e.currentTarget.dataset.index
    const duration = this.$data.videoPartList[index].partDuration
    const that = this
    if(this.$data.firstClick){
      wx.showModal({
        title:'提示',
        content:'您即将上传自己的视频内容，请在剪裁界面左右拖动进度条',
        success(res){
         if(res.confirm){
          that.$data.firstClick = false
          that.chooseFun(e)
         }
        }
      })
    }else{
      that.chooseFun(e)
    }
  },
  chooseFun(e){
    const index = e.currentTarget.dataset.index
    const duration = this.$data.videoPartList[index].partDuration
    const that = this
    wx.chooseVideo({
      camera: ['camera', 'album'],
      success: (res) => {
        const path = res.tempFilePath
        if (res.duration > duration) {
          that.editPhoto(index, duration, path)
        }else if(res.duration>30){
          wx.showToast({
            title: '视频长度不能超过30s',
          })
        } else {
          wx.showToast({
            title: `视频长度过小`,
          })
          // let videoList = this.$data.videoPartList
          // videoList[index].sourceVideoUrl = res.tempFilePath
          // videoList[index].duration = parseInt(res.duration)
          // that.$data.videoPartList = JSON.parse(JSON.stringify(videoList))
        }
      },
      faile: (err) => {
        console.log(err)
        wx.showToast({
          title: '上传视频失败',
          icon:'none'
        })
      }
    })
  },
  editPhoto(index, duration, path) {
    const that = this
    wx.openVideoEditor({
      filePath: path,
      success: (res) => {
        const tempDuration = parseInt(res.duration / 1000)
        if (tempDuration < duration) {
          wx.showToast({
            title: '视频长度过小',
            success(){
              that.editPhoto(index, duration, path)
            }
          })
        }else if(tempDuration>30){
          wx.showToast({
            title: '视频长度不能超过30s',
          })
        } else {
          let videoList = that.$data.videoPartList
          videoList[index].sourceVideoUrl = res.tempFilePath
          videoList[index].duration = parseInt(res.duration)/1000
          that.$data.videoPartList = JSON.parse(JSON.stringify(videoList))
          console.log(that.$data.videoPartList)
        }
      }
    })
  },
  makeVideoHandler() {
    const that = this
    if (app.checkLoginStatus()) {
      try {
        this.$data.videoPartList.forEach(item => {
          if (item.partType === 1 && !item.sourceVideoUrl) {
            throw new Error(item.partName)
          }
        })
        wx.requestSubscribeMessage({
          tmplIds: ['S-Lhv93FTvSxfyObEv_R3CcXbB5eKvkaGgTLZIhv4xQ'],
          success(res) {
            wx.showLoading({
              title: '上传中',
              icon: 'loading'
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
                orderId:1,
                userVideoPart: videoArray.length,
                templateId: that.$data.detail.templateId,
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
      } catch (e) {
        wx.showToast({
          title: `请上传视频`,
          icon:'none'
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
              icon:'none'
            })
          }
        })
      }).catch(e => {
        reject()
      })
    })
  }
})