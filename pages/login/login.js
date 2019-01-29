var request = require('../../utils/requestService.js'); //require请求
var interval;
Page({
    data: {
        entmobileBol: false, //确定按钮的显示颜色
        brith: '', //出生日期
        region: ['上海市', '上海市', '长宁区'],
        live: '请输入详细地址'
    },

    bindDateChange: function (e) {
        this.setData({
            brith: e.detail.value
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
            brith = this.data.brith,
            live = this.data.live;

        var getUrl = `login/update`,
            getData = {
                phone: wx.getStorageSync('phone'),
                openid: wx.getStorageSync('openId'),
                province: region[0],
                city: region[1],
                county: region[2],
                live: live,
                image: brith,
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

    }
});