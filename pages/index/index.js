//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图
    imgUrlsOne: [
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_1.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_2.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_3.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_4.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_5.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_6.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_7.png',
    ],
    imgUrlsTwo: [
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_2.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_1.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_2.png',
      'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_1.png',
    ],
    imgUrlsThree: [
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/space1.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/space2.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/space1.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/space2.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/space1.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/space2.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/space1.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/space2.png',
    ],
    imgUrlsfour: [
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/game1.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/game2.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/game3.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/game4.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/game1.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/game2.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/game3.png',
      'http://www.appsun.com.cn/www/fy/changning/imgs/lehuo/game4.png',
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
  },
  goSpaceList() {
    console.log('更多热门:list');
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



})