//my.js
//获取应用实例
const app = getApp()
var request = require('../../utils/requestService.js');
Page({
  data: {

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
        url: `../collect/news`
      })
    }
  },
  goSign() {
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
  onLoad: function () {
    console.log(wx.getStorageSync('phone'));
    if (!wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })
    }
  },
  onShow(){
    if (wx.getStorageSync('phone')) {
      var getUrl = `login/list`;
      var getData = {
        openid: wx.getStorageSync('openId')
      };
      request.requestGet(getUrl, getData)
        .then(function (response) {
          console.log(response)
          wx.setStorageSync('phone', response.data.data[0].phone);
          wx.setStorageSync('userId', response.data.data[0].id);
        }, function (error) {
          console.log(error);
        });
    }
  }
})