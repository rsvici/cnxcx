//my.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //事件处理函数
  setting() {
    wx.navigateTo({
      url: `../login/login`
    })
  },
  bindphone() {
    wx.navigateTo({
      url: `../bindphone/bindphone?type=upd`
    })
  },
  redeem() {
    wx.navigateTo({
      url: `../collect/collect`
    })
  },
  collect() {
    wx.navigateTo({
      url: `../collect/collect`
    })
  },
  goSign() {
    wx.navigateTo({
      url: `../collect/collect`
    })
  },
  onLoad: function () {
    console.log(wx.getStorageSync('phone'));
    if(!wx.getStorageSync('phone')){
      wx.navigateTo({
        url: '../bindphone/bindphone',
      })

    }
  }
})