//my.js
//获取应用实例
const app = getApp()
var request = require('../../utils/requestService.js');
Page({
  data: {
    signShow: false, //签到显示
    signImgShow: false, //今天是否签到
    userInfo: '', //用户信息
  },
  //事件处理函数
  setting() {
    if (!wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })
    } else {
      wx.navigateTo({
        url: `../login/login`
      })
    }
  },
  bindphone() {
    if (!wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })
    } else {
      wx.navigateTo({
        url: `../bindphone/bindphone?type=upd`
      })
    }
  },
  redeem() {
    if (!wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })
    } else {
      wx.navigateTo({
        url: `../redeem/redeem`
      })
    }

  },
  collect() {
    if (!wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })
    } else {
      wx.navigateTo({
        url: `../collect/collect`
      })
    }

  },
  goNews() {
    if (!wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })
    } else {
      wx.navigateTo({
        url: `../news/news`
      })
    }
  },
  goSign() {
    if (!wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })
    } else {
      var signShow, signImgShow;
      var postUrl = `sign/add`,
        postData = {
          userId: wx.getStorageSync('userId')
        },
        that = this;
      request.requestPost(postUrl, postData)
        .then(function (response) {
          signShow = !that.data.signShow;
          if (response.data.message == "成功") {
            signImgShow = true;
            that.addSaveIntegralDetaDetail();
          } else {
            signImgShow = false
          }

          that.setData({
            signShow,
            signImgShow
          })
        }, function (error) {
          console.log(error);
        });
    }
  },
  closeSignIn(){
    this.setData({
      signShow:false
    })
  },
  //新增评论积分
  addSaveIntegralDetaDetail() {
    var postUrl = `integral/saveIntegralDetaDetail`,
      postData = {
        userId: wx.getStorageSync('userId'),
        integralType: 2,
        integralPrice:1,
      },
      that = this;
    request.requestPost(postUrl, postData)
      .then(function (response) {
        console.log(response);
        that.getUserInfo();
      }, function (error) {
        console.log(error);
      });
  },
  onLoad: function () {
    if (!wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })
    }
  },
  getUserInfo() { //获取用户信息
    if (wx.getStorageSync('phone')) {
      var getUrl = `login/list`;
      var getData = {
          openid: wx.getStorageSync('openId')
        },
        that = this;
      request.requestGet(getUrl, getData)
        .then(function (response) {
          that.setData({
            userInfo: response.data.data[0]
          })
          wx.setStorageSync('phone', response.data.data[0].phone);
          wx.setStorageSync('userId', response.data.data[0].id);
        }, function (error) {
          console.log(error);
        });
    }
  },
  onShow() {
    this.getUserInfo();
  }
})