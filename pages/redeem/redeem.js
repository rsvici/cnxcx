/*
 * @Descripttion: 
 * @Version: 
 * @Author: rsvici
 * @Date: 2019-04-02 17:38:25
 */
var request = require('../../utils/requestService.js'); //require请求
const app = getApp()
Page({
    data: {
        integralList: [], //积分列表
        scale: '', //图片高度
        userInfo: '', //用户信息
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
    getIntegralDetail() { //获取积分明细
        var getUrl = `integral/detail`,
            getData = {userId:wx.getStorageSync('userId')},
            that = this;
        request.requestGet(getUrl, getData)
            .then(function (response) {
                console.log(response)
            }, function (error) {
                console.log(error);
            });
    },
    loadimg(event) {
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
    getUserInfo() { //获取用户信息
        if (wx.getStorageSync('phone')) {
            var getUrl = `login/list`;
            var getData = {
                    openid: wx.getStorageSync('openId')
                },
                that = this;
            request.requestGet(getUrl, getData)
                .then(function (response) {
                    that.setData({
                        userInfo: response.data.data[0]
                    })
                }, function (error) {
                    console.log(error);
                });
        }
    },
    onLoad: function (options) {
        this.getIntegralList();
        this.getIntegralDetail();
        this.getUserInfo();
    }
});