
// index.js
// 获取应用实例
import grace from '../../utils/grace'
import api from '../../utils/api'
const app = getApp()
grace.page({
  data:{
    wxPhone:'../../images/phone.png',
    phone:null,
    code: null,
    count:60,
    codeText:'点击获取'
  },
  onLoad(){
    this.$data.user = wx.getStorageSync('user')
  },
  inputChangeHandler(e){
    const key = e.currentTarget.dataset.key
    this.$data[key] = e.detail.value
  },
  bindHandler(){
    if(!this.$data.phone){
      return wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
    }
    if(!this.$data.code){
      return wx.showToast({
        title: '验证码不能为空',
        icon:'none'
      })
    }

    app._showLoading()
    this.$http.post(api.appUser.bindPhoneNumber,{
      phoneNumber:this.$data.phone,
      smsCode:this.$data.code
    }).then(res=>{
      app._hideLoading()
      wx.showToast({
        title: '修改成功',
        icon:'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta:1
        })
      }, 2000);
    })
  },
  getCodeHandler(){
    const that = this
    if(!this.$data.phone){
      return wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
    }
    app._showLoading()
    that.$http.get(api.appUser.sendSms,{
      phoneNumber :that.$data.phone
    }).then(res=>{
      app._hideLoading()
      const interval = setInterval(() => {
        if(that.$data.count>0){
          that.$data.count--
          that.$data.codeText = `${that.$data.count}s`
          console.log(that.$data.codeText)
        }else if(that.$data.count === 0){
          clearInterval(interval)
          that.$data.codeText = '重新获取'
          that.$data.count = 60
        }
      }, 1000);
    })
    
  }
  
})

