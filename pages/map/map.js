var request = require('../../utils/requestService.js'); //require请求
Page({
    data: {
        url: "",
    },
    bindGetMsg: function (e) {
        // var that = this;
        // if (e.detail.data[0].wxgopay.orderNum) {
        //     var orderNum = e.detail.data[0].wxgopay.orderNum;
        // }
    },

    onLoad: function (options) {

        var that=this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                let south = res.latitude;
                let west = res.longitude;
                let url = 'https://www.appsun.com.cn/www/fy/changning'
                url = `${url}/map/?south=${south}&west=${west}&v=${Math.random()}`
                that.setData({
                    url
                });
            },
            fail(){
                let url = 'https://www.appsun.com.cn/www/fy/changning'
                url = `${url}/map/?v=${Math.random()}`
                that.setData({
                    url
                });
            }
        })
        
    }
});