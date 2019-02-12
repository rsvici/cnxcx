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
        console.log(options);
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                const south = res.latitude;
                const west = res.longitude;
                let url = `${options.url}?south=${south}&west=${west}`
                if (options.endsouth) {
                    url = `${url}&endsouth=${options.endsouth}&endwest=${options.endwest}`
                }
                console.log(url);
                that.setData({
                    url
                });
            },
            fail() {
                that.setData({
                    url: options.url
                });
            }
        })

    }
});