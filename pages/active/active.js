//index.js
//获取应用实例
var Detail = require('../../utils/detail.js');
var request = require('../../utils/requestService.js'); //require请求
var formatTime = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    getData: {},  //传输数据
    ActiveList: [],//活动列表
    choiceListindex:0, //tab按钮
  },
  choiceList(e) { //选择不同活动
    var activityType = e.currentTarget.dataset.activitytype;
    this.setData({
      ActiveList:[],
      choiceListindex: e.currentTarget.dataset.index,
    })
    if(activityType){
      this.data.getData.activityType=activityType;
    }else{
      delete this.data.getData.activityType
    }
    this.data.getData.pageNo=1;
    this.getActivityList(this.data.getData)
  },
  searchGoods(e){
    var getData=this.data.getData;
    getData.name = e.detail.value;
    this.setData({
      ActiveList: [],
      getData
    })
    this.getActivityList(getData)
  },
  goActiveInfo(event) {
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
      getData.auditStatus=1;
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
      }, function (error) {
        console.log(error);
      });
  },
  onLoad(option) {
    var getData=option;
    getData.pageNo=1;
    this.setData({
      getData
    })
    this.getActivityList(getData);
  },

  onPullDownRefresh() {
    var getData=this.data.getData;
    getData.pageNo=1;
    getData.name='';
    this.setData({
      ActiveList: [],
      dontUpLoading: false,
      getData
    })
    this.getActivityList(getData);
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 500)
  },


  onReachBottom() {
    var getData=this.data.getData;
    getData.pageNo += 1;
    this.setData({
      getData
    })
    this.getActivityList(getData)
  }

})