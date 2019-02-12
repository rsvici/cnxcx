//index.js
var Detail = require('../../utils/detail.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图
    imgUrlsOne: [{
      imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_5.png',
      type: 'active',
      index: '0'
    }, {
      imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_1.png',
      type: 'drama',
      index: '2'
    }, {
      imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b1_6.png',
      type: 'active',
      index: '1'
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
        imgurl: 'http://www.appsun.com.cn/www/fy/changning/image/lehuo/b2_3.png',
        type: 'active',
        index: '2'
      }, {
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
    imgUrlsThree: [{
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

    ],
    imgUrlsfour: [{
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
    activeList: [],
    swiperH: '', //swiper高度
    nowIdx: 0, //当前swiper索引
    choiceListindex:0,
  },
  //获取swiper高度
  getHeight: function (e) {
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width;
    
    var sH = 700 * imgh / imgw + "rpx"
    console.log(imgh,imgw,sH);
    this.setData({
      swiperH: sH //设置高度
    })
  },
  //swiper滑动事件
  swiperChange: function (e) {
    this.setData({
      nowIdx: e.detail.current
    })
  },
  goTypeList(event) { //去类型列表
    console.log('类型列表:');
    console.log(event.currentTarget.dataset.navindex);
    let navindex = event.currentTarget.dataset.navindex;
    switch (navindex) {
      case '8':
        wx.navigateTo({
          url: `../movie/movie`
        })
        break;
      case '12':
        wx.navigateTo({
          url: `../drama/drama`
        })
        break;
      case '13':
        wx.navigateTo({
          url: `../active/active?type=sport`
        })
        break;
        // default :
        // wx.navigateTo({
        //   url: `../active/active`
        // })
    }

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
      url: `../webview/webview?url=https://www.appsun.com.cn/www/fy/changning/#/hotbusiness`
    })
  },
  goMap() {
    wx.navigateTo({
      url: `../webview/webview?url=https://www.appsun.com.cn/www/fy/changning/map/index.html`
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
      activeList: Detail.detail.active,
      navTypeList: Detail.detail.drama,
      movieList: Detail.detail.movie
    })
  },
  choiceList(e){ //选择活动
    var index=e.currentTarget.dataset.index
    console.log(index);
    switch(index){
      case '0':
      this.setData({
        activeList: Detail.detail.active,
        navTypeList: Detail.detail.drama,
        movieList: Detail.detail.movie,
        choiceListindex:0
      })
      break;
      case '1':
      this.setData({
        activeList: [],
        navTypeList: Detail.detail.drama,
        movieList: [],
        choiceListindex:1
      })
      break;
      case '2':
      this.setData({
        activeList: [],
        navTypeList: [],
        movieList: Detail.detail.movie,
        choiceListindex:2
      })
      break;
      case '3':
      this.setData({
        activeList: Detail.detail.active,
        navTypeList: [],
        movieList:[],
        choiceListindex:3
      })
      break;
    }

  }




})