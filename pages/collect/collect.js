var request = require('../../utils/requestService.js'); //require请求
var formatTime = require('../../utils/util.js');
Page({
    data: {
        collectList:[]
    },
    getCommentList(){
        var getUrl = `collect/listCollect`,
        getData = {
          userId: wx.getStorageSync('userId'),
        },
        that = this;
      request.requestGet(getUrl, getData)
        .then(function (response) {
          var collectList=response.data.data;
          collectList.forEach(function (value, key) {
            if (value.activityBeginTime) {
              var time = value.activityBeginTime;
              collectList[key].activityBeginTime = formatTime.formatTime(time, 'Y/M/D')
            }
            if (value.activityEndTime) {
              var time = value.activityEndTime;
              collectList[key].activityEndTime = formatTime.formatTime(time, 'Y/M/D')
            }
          })
          console.log(collectList);

            that.setData({
                collectList
            })
        }, function (error) {
          console.log(error);
        });
    },
    deleteCollect(event){
      var collectId=event.currentTarget.dataset.collectid;
      var getUrl = `collect/delete`,
        getData = {
          collectId
        },
        that = this;
      request.requestPost(getUrl, getData)
        .then(function (response) {
          that.getCommentList();
        }, function (error) {
          console.log(error);
        });
     
    },
    onLoad: function (options) {
        this.getCommentList();
    
    }
});