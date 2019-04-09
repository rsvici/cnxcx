var request = require('../../utils/requestService.js'); //require请求
const app = getApp()
Page({
    data: {
        integralList: [], //积分列表
        scale:'',  //图片高度
    },
    getIntegralList() { //获取积分
        var getUrl = `integral/list`,
            getData = {},
            that = this;
        request.requestGet(getUrl, getData)
            .then(function (response) {
                console.log(response)
                that.setData({
                    integralList: response.data.data.parameterType
                })
            }, function (error) {
                console.log(error);
            });
    },
    loadimg(event){
        console.log(event)
        // var  height=event.detail.height,
        //     width=event.detail.width,
        //     integralList=this.data.integralList,
        //     index=event.currentTarget.dataset.index;
        // var scale=width*30/36*750/1000;
        // integralList[index].scale=0
        // this.setData({
        //     integralList
        // })
        // console.log(scale)
    },
    onLoad: function (options) {
        this.getIntegralList();

    }
});