// 本服务用于封装请求
// 返回的是一个promisepromise
// get
var requestGet = function (newUrl, newData) {
    wx.showLoading({
        title: '加载中',
        mask: true
    });
    var promise = new Promise(function (resolve, reject) {
        wx.request({
            url: 'https://www.appsun.com.cn/CLMAP/' + newUrl,
            data: newData,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(e) {
                if (e.data.code == '000') {
                    setTimeout(function () {
                        wx.hideLoading();
                        resolve(e)
                    }, 500)
                } else {
                    setTimeout(function () {
                        wx.showToast({
                            title: e.data.message,
                            icon: 'none'
                        })
                        reject(e)
                    }, 500)
                }
            },
            fail(e) {
                wx.showLoading({
                    title: '网络错误'
                })
            }
        });
    });
    return promise;
};

// post
var requestPost = function (newUrl, newData) {
    wx.showLoading({
        title: '提交中',
        mask: true
    });
    var promise = new Promise(function (resolve, reject) {
        wx.request({
            url: 'https://www.appsun.com.cn/CLMAP/' + newUrl,
            data: newData,
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success(e) {
                if (e.data.code == '000' ||e.data.code == '001' ) {
                    setTimeout(function () {
                        wx.hideLoading();
                        resolve(e)
                    }, 500)
                } else {
                    setTimeout(function () {
                        wx.showToast({
                            title: e.data.message,
                            icon: 'none'
                        })
                        reject(e)
                    }, 500)
                }
            },
            fail(e) {
                wx.showLoading({
                    title: '网络错误'
                })
            }
        });
    });
    return promise;
};


module.exports = {
    'requestGet': requestGet,
    'requestPost': requestPost,
};