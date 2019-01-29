//index.js
//获取应用实例
var Detail = require('../../utils/detail.js');
const app = getApp()

Page({
  data: {
    navTypeBol: true,
    navTypeList: [],
    movieList:[],
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
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../detail/detail?type=${type}&index=${index}`
    })
  },

  onLoad(option){
    console.log(option)
    this.setData({
      navTypeList:Detail.detail.drama,
      movieList:Detail.detail.movie
    })
  }


})