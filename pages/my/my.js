//my.js
//获取应用实例
const app = getApp()

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
        url: `../collect/collect`
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
        url: `../collect/collect`
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
  }
})