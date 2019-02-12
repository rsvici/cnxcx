var request = require('../../utils/requestService.js'); //require请求
var interval;
Page({
    data: {
        telBtn: '获取验证码', //提示
        code: '', //输入验证码
        currentTime: 60, // 初始事件
        rightMobileNo: 0, //获取验证码
        entmobileBol: false, //确定按钮的显示颜色
        tel: '手机号', //手机号
        isUpd: false, //是否是修改
        isNoGetCode: false,
        isNoPostUserInfo: false,
    },
    telInput: function (e) {
        this.setData({
            tel: e.detail.value
        });
    },
    codeInput: function (e) {
        this.setData({
            code: e.detail.value
        });
        if (e.detail.value.length == 6) {
            this.setData({
                entmobileBol: true
            })
        } else {
            this.setData({
                entmobileBol: false
            })
        }
    },
    // 获取验证码
    postMobileNo: function () {
      
        if (this.data.tel.legth < 11 || (!this.data.tel)) {
            return;
        }
        if (this.data.isNoGetCode) {
            return;
        }
        this.setData({
            isNoGetCode: true
        })
        if (this.data.telBtn == '请重新获取' || this.data.telBtn == '获取验证码') {
            var that = this;
            var postUrl = `login/sendCode?phone=${this.data.tel}`;
            var postData = {
                // phone: this.data.tel 
            };
            request.requestPost(postUrl, postData)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.message == '成功') {
                        that.timeOutFun();
                        that.setData({
                            rightMobileNo: response.data.data
                        });
                    }

                }, function (error) {
                    console.log(error);
                });
        }

    },
    // 倒计时60s
    timeOutFun: function () {
        var that = this;
        var currentTime = that.data.currentTime;
        that.setData({
            telBtn: currentTime + '秒'
        });
        var interval = setInterval(function () {
            that.setData({
                telBtn: (currentTime - 1) +
                    '秒'
            });
            currentTime--;
            if (currentTime <= 0) {
                clearInterval(interval);
                that.setData({
                    currentTime: 60,
                    telBtn: '请重新获取',
                    isNoGetCode: true
                });
            }
        }, 1000);
    },
    bindMobile: function () {
        var code = this.data.code;
        var that = this;
        var rightMobileNo = this.data.rightMobileNo;
        if (code == rightMobileNo && code.length == 6) {
            if (this.data.isNoPostUserInfo) {
                return;
            }
            this.setData({
                isNoPostUserInfo: true
            })

            if (this.data.isUpd) {
                var postUrl = `login/update`;
                var postData = {
                    phone: this.data.tel,
                    openid: wx.getStorageSync('openId')
                };
                request.requestPost(postUrl, postData)
                    .then(function (response) {
                        wx.setStorageSync('phone', that.data.tel);
                        wx.showToast({
                            title: '修改成功',
                            icon: 'success',
                            duration: 1100,
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
            } else {
                var postUrl = `login/registeredUser`;
                var postData = {
                    phone: this.data.tel,
                    openid: wx.getStorageSync('openId')
                };
                request.requestPost(postUrl, postData)
                    .then(function (response) {
                        wx.setStorageSync('phone', that.data.tel);
                        wx.showToast({
                            title: '注册成功',
                            icon: 'success',
                            duration: 1500,
                            success: function () {
                                setTimeout(function () {
                                    wx.switchTab({
                                        url: '../my/my',
                                    })
                                }, 1800)
                            }
                        })
                    }, function (error) {
                        console.log(error);
                    });
            }
        } else {
            wx.showToast({
                title: '请输入正确的验证码',
                icon:'none',
                duration: 1500,
                complete: function () {
                  
                }
            })
        }
    },
    onLoad: function (option) {
        if (option.type === 'upd') {
            console.log(1)
            this.setData({
                tel: wx.getStorageSync('phone'),
                isUpd: true
            })
        }

    }
});