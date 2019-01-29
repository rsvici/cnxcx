//index.js
//获取应用实例
var Detail = require('../../utils/detail.js');
const app = getApp()

Page({
  data: {
    navTypeBol: true,
    navTypeList: [],
  },
  openType() {
    let navTypeBol = !this.data.navTypeBol;
    this.setData({
      navTypeBol
    })
  },
  navTypeChoice(event) {
    console.log(event.currentTarget.dataset.typeindex);
    this.setData({
      navTypeBol: true
    })
  },
  goActiveInfo(event) {
    var index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../detail/detail?type=drama&index=${index}`
    })
  },

  onLoad(){
    console.log(Detail.detail.drama)
    this.setData({
      navTypeList:Detail.detail.drama
    })
  }


})