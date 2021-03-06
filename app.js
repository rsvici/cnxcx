//app.js
var request = require('./utils/requestService.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: `https://www.appsun.com.cn/CLMAP/wechat/getOpenid?code=${res.code}`,
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            success: function (res) {
              wx.setStorageSync('openId', res.data.data.openid);

              var getUrl = `login/list`;
              var getData = {
                openid: res.data.data.openid
              };
              request.requestGet(getUrl, getData)
                .then(function (response) {
                  if(response.data.data.length>0){
                    wx.setStorageSync('phone', response.data.data[0].phone);
                    wx.setStorageSync('userId', response.data.data[0].id);
                  }else{
                    wx.setStorageSync('phone', '');
                  }
                
                }, function (error) {
                  console.log(error);
                });



            }
          });



        }




      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

     // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
     const updateManager = wx.getUpdateManager()

     updateManager.onCheckForUpdate(function (res) {
       // 请求完新版本信息的回调
       console.log(res.hasUpdate)
     })
 
     updateManager.onUpdateReady(function () {
       wx.showModal({
         title: '更新提示',
         content: '新版本已经准备好，是否马上重启小程序？',
         success: function (res) {
           if (res.confirm) {
             // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
             updateManager.applyUpdate()
           }
         }
       })
     })
 
     updateManager.onUpdateFailed(function () {
       // 新的版本下载失败
     })
  },
  globalData: {
    userInfo: null
  }
})