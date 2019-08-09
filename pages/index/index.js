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
    autoplay: false, //循环
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
    pageNo: 1, //上拉加载
    activityType: '', // 类型
    activityTypeList: [], //
    activityTypeIndexNum: 9, //
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
      case 8:
        wx.navigateTo({
          url: `../movie/movie`
        })
        break;
      default:
        wx.navigateTo({
          url: `../active/active?activityType=${navindex}`
        })
        break;
      // case '12':
      //   wx.navigateTo({
      //     url: `../active/active?activityType=0`
      //   })
      //   break;
      // case '13':
      //   wx.navigateTo({
      //     url: `../active/active?activityType=3`
      //   })
      //   break;
    }
  },
  shoiceNavBol() { //关闭打开nav
    if (this.data.activityTypeIndexNum > 9) {
      var activityTypeIndexNum = 9;
    } else {
      var activityTypeIndexNum = 1000;
    }
    this.setData({
      activityTypeIndexNum
    })
  },
  goActiveListSeacrh(e){
    wx.navigateTo({
      url: `../active/active?name=${e.detail.value}`
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
      getData.auditStatus=1;
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
        // if(hotActiveList[name].length<4){
        //   hotActiveList[name].length=4;
        // }

        that.setData({
          hotActiveList: hotActiveList
        })
        console.log(that.data.hotActiveList)

      }, function (error) {
        console.log(error);
      });
  },
  getActivityTypeList() {
    var getUrl = `activityType/list`,
      getData = {},
      that = this;
    request.requestGet(getUrl, getData)
      .then(function (response) {
        var activityTypeList = response.data.data.parameterType
        console.log(activityTypeList)
        that.setData({
          activityTypeList
        })
      }, function (error) {
        console.log(error);
      });
  },
  onLoad() {
    var pageNo = 1;
    this.getActivityList({
      type: 1,
      pageSize: 15,
      pageNo: pageNo
    }, 'banner0');
    this.getActivityList({
      type: 2,
      pageSize: 15,
      pageNo: pageNo
    }, 'banner1');
    this.getActivityList({
      type: 3,
      pageSize: 15,
      pageNo: pageNo
    }, 'banner2');
    this.getActivityList({
      type: 4,
      pageSize: 15,
      pageNo: pageNo
    }, 'banner3');
    this.getActivityList({
      pageSize: 15,
      pageNo: pageNo
    }, 'all');
    this.getActivityTypeList();
    this.setData({
      activeList: Detail.detail.active,
      navTypeList: Detail.detail.drama,
      movieList: Detail.detail.movie
    })
  },
  choiceList(e) { //选择不同活动
    var index = e.currentTarget.dataset.index;
    var activityType = e.currentTarget.dataset.activitytype;
    var hotActiveList = this.data.hotActiveList;
    hotActiveList.all = [];
    console.log(index);
    this.setData({
      choiceListindex: index,
      activityType,
      pageNo: 1,
      hotActiveList
    })
    if (!activityType) {
      var getData = {}
    } else {
      var getData = {
        activityType
      }
    }
    this.getNewAcitiveList(getData)

  },
  getNewAcitiveList(getData) {
    var getUrl = `activity/list`,
      that = this,
      hotActiveList = this.data.hotActiveList;
      getData.auditStatus=1;
    console.log(getData);
    request.requestGet(getUrl, getData)
      .then(function (response) {
        var newhotActiveList = response.data.data.parameterType
        newhotActiveList.forEach(function (value, key) {
          if (value.activityBeginTime) {
            var time = value.activityBeginTime;
            newhotActiveList[key].activityBeginTime = formatTime.formatTime(time, 'Y/M/D')
          }
          if (value.activityEndTime) {
            var time = value.activityEndTime;
            newhotActiveList[key].activityEndTime = formatTime.formatTime(time, 'Y/M/D')
          }
        })

        hotActiveList.all = hotActiveList.all.concat(newhotActiveList);
        that.setData({
          hotActiveList: hotActiveList
        })
        console.log(that.data.hotActiveList)

      }, function (error) {
        console.log(error);
      });
  },
  onReachBottom() {
    var pageNo = this.data.pageNo;
    pageNo += 1
    this.setData({
      pageNo
    })
    var activityType = this.data.activityType;
    if (!activityType) {
      var getData = {
        pageNo
      }
    } else {
      var getData = {
        activityType,
        pageNo
      }
    }
    this.getNewAcitiveList(getData)
  }

})