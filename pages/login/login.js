var request = require('../../utils/requestService.js'); //require请求
var interval;
Page({
    data: {
        entmobileBol: false, //确定按钮的显示颜色
        birthday: '', //出生日期
        region: ['上海市', '上海市', '长宁区'],
        live: '请输入详细地址',
        isNoPostUserInfo: false,
        userId:''
    },

    bindDateChange: function (e) {
        console.log(e.detail.value)
        this.setData({
            birthday: e.detail.value
        });
    },
    liveInput: function (e) {
        this.setData({
            live: e.detail.value
        });
    },
    bindRegionChange: function (e) {
        this.setData({
            region: e.detail.value
        });
    },
    bindMobile: function () {

        var that = this,
            region = this.data.region,
            birthday = this.data.birthday,
            live = this.data.live,
            id=this.data.userId;
      
        this.setData({
            isNoPostUserInfo: true
        })
        var getUrl = `login/update`,
            getData = {
                phone: wx.getStorageSync('phone'),
                openid: wx.getStorageSync('openId'),
                live,
                birthday,
                id,
                province:region[0],
                city:region[1],
                county:region[2],
            };
        request.requestPost(getUrl, getData)
            .then(function (response) {
                wx.showToast({
                    title: '修改信息成功',
                    icon: 'success',
                    duration: 1000,
                    success: function () {
                        setTimeout(function () {
                            wx.switchTab({
                                url: '../my/my',
                            })
                        }, 1100)
                    }
                })
            }, function (error) {
                console.log(error);
            });
    },
    onLoad: function () {
        // this.getWxUserInfo();
        var that=this;
        var getUrl = `login/list`;
        var getData = {
          openid: wx.getStorageSync('openId')
        };
        request.requestGet(getUrl, getData)
          .then(function (response) {
            console.log(response)
            var userinfoObj=response.data.data[0];
            if(userinfoObj.province){
                that.setData({
                    region:[userinfoObj.province,userinfoObj.city,userinfoObj.county]
                })
            }
            if(userinfoObj.live){
                that.setData({
                    live:userinfoObj.live
                })
            }
            if(userinfoObj.birthday){
                that.setData({
                    birthday:userinfoObj.birthday
                }) 
            }
            that.setData({
                userId:response.data.data[0].id
            })
          }, function (error) {
            console.log(error);
          });
    }
});