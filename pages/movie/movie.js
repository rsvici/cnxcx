//index.js
//获取应用实例
const app = getApp()
var Detail = require('../../utils/detail.js');
var request = require('../../utils/requestService.js'); //require请求
var formatTime = require('../../utils/util.js');
Page({
  data: {
    navTypeBol:true,
    navTypeList:[], 
    ActiveList:[],
    pageNo:1,
  },
  openType(){
    let navTypeBol=!this.data.navTypeBol;
    this.setData({
      navTypeBol
    })
  },
  navTypeChoice(event){
    console.log(event.currentTarget.dataset.typeindex);
    this.setData({
      navTypeBol:true
    })
  },
  goActiveInfo(event) {
    // var item =  JSON.stringify(event.currentTarget.dataset.item);
    var id = event.currentTarget.dataset.item.id;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  getActivityList(info) { //获取活动
    var getUrl = `activity/list`,
      getData =info,
      that = this;
      var ActiveList=this.data.ActiveList;
    request.requestGet(getUrl, getData)
      .then(function (response) {
        var newActiveList = response.data.data.parameterType
        newActiveList.forEach(function (value, key) {
          if (value.activityBeginTime) {
            var time = value.activityBeginTime;
            newActiveList[key].activityBeginTime = formatTime.formatTime(time, 'Y/M/D')
          }
          if (value.activityEndTime) {
            var time = value.activityEndTime;
            newActiveList[key].activityEndTime = formatTime.formatTime(time, 'Y/M/D')
          }
        })

        ActiveList=ActiveList.concat(newActiveList)
        that.setData({
          ActiveList
        })

      }, function (error) {
        console.log(error);
      });
  },
  onLoad(){
    this.getActivityList({activityType:1});
  },
  onPullDownRefresh() {
    this.setData({
      pageNo: 1,
      ActiveList: [],
      dontUpLoading: false,
    })
    this.getActivityList({activityType:1});

    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 500)
  },
  onReachBottom() {
    var pageNo = this.data.pageNo;
    pageNo += 1
    this.setData({
      pageNo
    })
    
    this.getActivityList({
      activityType:1,
      pageNo
    })
  }
})