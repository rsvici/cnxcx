//index.js
var Detail = require('../../utils/detail.js');
var request = require('../../utils/requestService.js'); //require请求
var formatTime = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    hotActiveList: {}, //热门活动列表
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
    choiceListindex: 0,
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
          url: `../active/active?activityType=0`
        })
        break;
      case '13':
        wx.navigateTo({
          url: `../active/active?activityType=3`
        })
        break;
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
  openType() { //显示所有nav
    let navTypeBol = !this.data.navTypeBol;
    this.setData({
      navTypeBol
    })
  },
  navTypeChoice(event) { //选择不同类型
    console.log(event.currentTarget.dataset.typeindex);
    this.setData({
      navTypeBol: true
    })
  },
  // 跳转webview	
  goBusiness() {
    wx.navigateTo({
      url: `../webview/webview?url=https://www.appsun.com.cn/www/changning/#/hotbusiness`
    })
  },
  goMap() {
    wx.navigateTo({
      url: `../webview/webview?url=https://www.appsun.com.cn/www/changning/map/index.html`
    })
  },
  // 去详情页面
  goActiveInfo(event) {
    // var item =  JSON.stringify(event.currentTarget.dataset.item);
    var id = event.currentTarget.dataset.item.id;

    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  getActivityList(info, name) { //获取活动
    var getUrl = `activity/list`,
      getData = info,
      that = this,
      hotActiveList = this.data.hotActiveList;
    request.requestGet(getUrl, getData)
      .then(function (response) {
        hotActiveList[name] = response.data.data.parameterType
        hotActiveList[name].forEach(function (value, key) {
          if (value.activityBeginTime) {
            var time = value.activityBeginTime;
            hotActiveList[name][key].activityBeginTime = formatTime.formatTime(time, 'Y/M/D')
          }
          if (value.activityEndTime) {
            var time = value.activityEndTime;
            hotActiveList[name][key].activityEndTime = formatTime.formatTime(time, 'Y/M/D')
          }
        })

        that.setData({
          hotActiveList: hotActiveList
        })
        console.log(that.data.hotActiveList)

      }, function (error) {
        console.log(error);
      });
  },
  onLoad() {
    this.getActivityList({
      tradingAreaId: 44
    }, 'banner0');
    this.getActivityList({
      tradingAreaId: 45
    }, 'banner1');
    this.getActivityList({
      tradingAreaId: 47
    }, 'banner2');
    this.getActivityList({
      tradingAreaId: 49
    }, 'banner3');
    this.getActivityList({
      pageSize: 15,
      pageNo: 1
    }, 'all');

    this.setData({
      activeList: Detail.detail.active,
      navTypeList: Detail.detail.drama,
      movieList: Detail.detail.movie
    })
  },
  choiceList(e) { //选择不同活动
    var index = e.currentTarget.dataset.index;
    var activityType = e.currentTarget.dataset.activitytype;
    console.log(index);
    this.setData({
      choiceListindex:index
    })
    if (!activityType) {
      var getData = {
      }
    }else{
      var getData = {
        activityType
      }
    }
    var getUrl = `activity/list`,
      that = this,
      hotActiveList = this.data.hotActiveList;
    request.requestGet(getUrl, getData)
      .then(function (response) {
        hotActiveList.all = response.data.data.parameterType
        hotActiveList.all.forEach(function (value, key) {
          if (value.activityBeginTime) {
            var time = value.activityBeginTime;
            hotActiveList.all[key].activityBeginTime = formatTime.formatTime(time, 'Y/M/D')
          }
          if (value.activityEndTime) {
            var time = value.activityEndTime;
            hotActiveList.all[key].activityEndTime = formatTime.formatTime(time, 'Y/M/D')
          }
        })

        that.setData({
          hotActiveList: hotActiveList
        })
        console.log(that.data.hotActiveList)

      }, function (error) {
        console.log(error);
      });

  }




})