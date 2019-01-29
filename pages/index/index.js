//index.js
var Detail = require('../../utils/detail.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图
    imgUrlsOne: [{
      imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_1.png',
      type: 'drama',
      index: '2'
    }, {
      imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_2.png',
      type: 'movie',
      index: '4'
    }, {
      imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_3.png',
      type: 'movie',
      index: '19'
    }, {
      imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_4.png',
      type: 'movie',
      index: '20'
    }, ],
    imgUrlsTwo: [{
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_1.png',
        type: 'drama',
        index: '3'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_2.png',
        type: 'drama',
        index: '4'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_1.png',
        type: 'drama',
        index: '3'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_2.png',
        type: 'drama',
        index: '4'
      },
    ],
    imgUrlsThree: [
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b3_1.png',
        type: 'drama',
        index: '2'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b3_2.png',
        type: 'movie',
        index: '9'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b3_3.png',
        type: 'drama',
        index: '7'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b3_4.png',
        type: 'movie',
        index: '14'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b3_1.png',
        type: 'drama',
        index: '2'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b3_2.png',
        type: 'movie',
        index: '9'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b3_3.png',
        type: 'drama',
        index: '7'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b3_4.png',
        type: 'movie',
        index: '14'
      },
    ],
    imgUrlsfour: [
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b4_1.png',
        type: 'sport',
        index: '0'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b4_2.png',
        type: 'sport',
        index: '1'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b4_3.png',
        type: 'sport',
        index: '2'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b4_4.png',
        type: 'sport',
        index: '3'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b4_1.png',
        type: 'sport',
        index: '0'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b4_2.png',
        type: 'sport',
        index: '1'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b4_3.png',
        type: 'sport',
        index: '2'
      },
      {
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b4_4.png',
        type: 'sport',
        index: '3'
      },
    

    ],
    indicatorDots: true, //点
    autoplay: true, //循环
    interval: 5000, //等待时间
    duration: 1000, //切换时间
    circular: true, //无缝连接
    // 分类导航
    navBol: true, //打开更多
    // 列表
    navTypeBol: true,
    navTypeList: [],
    movieList: [],
  },
  goTypeList(event) { //去类型列表
    console.log('类型列表:');
    console.log(event.currentTarget.dataset.navindex);
  },
  shoiceNavBol() { //关闭打开nav
    let navBol = this.data.navBol;
    this.setData({
      navBol: !navBol
    })
  },
  goActiveList() { //去精彩
    console.log('更多精彩:list');
    wx.navigateTo({
      url: `../active/active`
    })
  },
  goSpaceList() {
    console.log('更多热门:list');
    wx.navigateTo({
      url: `../active/active`
    })
  },
  goSportList() {
    console.log('更多运动:list');
    wx.navigateTo({
      url: `../active/active`
    })
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
  // 跳转webview	
  goBusiness() {
    wx.navigateTo({
      url: `../webview/webview?type=hotbusiness`
    })
  },
  goMap() {
    wx.navigateTo({
      url: `../webview/webview?type=map`
    })
  },
  // 去详情页面
  goActiveInfo(event) {
    var index = event.currentTarget.dataset.index;
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../detail/detail?type=${type}&index=${index}`
    })
  },
  onLoad() {
    // console.log(Detail.detail.drama)
    this.setData({
      navTypeList: Detail.detail.drama,
      movieList: Detail.detail.movie
    })
  }



})