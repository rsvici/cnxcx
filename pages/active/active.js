//index.js
//获取应用实例
var Detail = require('../../utils/detail.js');
var request = require('../../utils/requestService.js'); //require请求
var formatTime = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    navTypeBol: true,
    navTypeList: [],
    ActiveList: [],
    getData: {},
    pageNo:1,
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
    // var item =  JSON.stringify(event.currentTarget.dataset.item);
    var id = event.currentTarget.dataset.item.id;

    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  getActivityList(getData) { //获取活动
    var getUrl = `activity/list`,
      getData,
      that = this,
      ActiveList =this.data.ActiveList;
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
          ActiveList: ActiveList
        })
        console.log(that.data.ActiveList)

      }, function (error) {
        console.log(error);
      });
  },
  onLoad(option) {
    var getData;
    // if (option.activityType) {
    //   getData = {
    //     activityType: option.activityType,
    //     pageNo: 1,
    //   }
    // }else {
    //   getData = {
    //     pageNo: 1,
    //   }
    // }
    getData=option;
    getData.pageNo=1;
    this.setData({
      getData
    })
    this.getActivityList(getData);
  },

  onPullDownRefresh() {
    var getData=this.data.getData;
    getData.pageNo=1
    this.setData({
      pageNo: 1,
      ActiveList: [],
      dontUpLoading: false,
      getData
    })
    this.getActivityList(
      getData
    );
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 500)
  },
  onReachBottom() {
    var pageNo = this.data.pageNo;
    var getData=this.data.getData;
    pageNo += 1;
    getData.pageNo=pageNo
    this.setData({
      pageNo,
      getData
    })

    this.getActivityList(getData)
  }

})