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
        let url = 'https://www.appsun.com.cn/www/fy/changning'
        switch (options.type) {
            case 'map':
                url = `${url}/map/?v=${Math.random()}`
                break;
            case 'hotbusiness':
                url = `${url}/#/hotbusiness?v=${Math.random()}`
                break;
            case 'url':
                url = options.url
                break;
            default:
                url = `${url}/map/?v=${Math.random()}`
        }

        this.setData({
            url
        });

    }
});