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
      that = this,
      ActiveList=[];
    request.requestGet(getUrl, getData)
      .then(function (response) {
         ActiveList = response.data.data.parameterType
        ActiveList.forEach(function (value, key) {
          if (value.activityBeginTime) {
            var time = value.activityBeginTime;
            ActiveList[key].activityBeginTime = formatTime.formatTime(time, 'Y/M/D')
          }
          if (value.activityEndTime) {
            var time = value.activityEndTime;
            ActiveList[key].activityEndTime = formatTime.formatTime(time, 'Y/M/D')
          }
        })

        that.setData({
          ActiveList: ActiveList
        })
        console.log(that.data.ActiveList)

      }, function (error) {
        console.log(error);
      });
  },
  onLoad(){
    this.getActivityList({activityType:1});
  }
})