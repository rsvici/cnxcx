//detail.js
//获取应用实例
const app = getApp()
var activeDetail = require('../../utils/detail.js');
Page({
  data: {
    indicatorDots: true, //点
    autoplay: false, //循环
    interval: 5000, //等待时间
    duration: 1000, //切换时间
    circular: false, //无缝连接
    collectNum: false, //收藏
    activeDetail: {}, //活动详情
    showWebType: '', //显示的页面
  },
  onLoad() {

  },
  choiceCollectFun() {
    let collectNum = !this.data.collectNum;
    this.setData({
      collectNum
    })
  },
  goBusiness(e) {
    wx.navigateToMiniProgram({
      appId: 'wxc7a6875e40c89517',
      path: '',
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },
  imageLoad: function (e) {
    var activeDetail = this.data.activeDetail,
      ImgVideonum = e.currentTarget.dataset.index;

    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $height / $width; //图片的真实宽高比例
    var viewWidth = 300 / ratio, //设置图片显示宽度，
      viewHeight = 300; //计算的高度值   

    activeDetail.imgvideo[ImgVideonum].imgwidth = viewWidth;
    activeDetail.imgvideo[ImgVideonum].viewHeight = viewHeight;

    this.setData({
      activeDetail
    })
  },
  //图片点击事件
  imgYu(event) {
    var current = event.currentTarget.dataset.src; //获取data-src
    var imgList = this.data.activeDetail.imgvideo; //获取data-list
    var urls=[];
    for (var index in imgList) {
      urls.push(imgList[index].imgurl)
   }
    // //图片预览
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    })
      
  },

  onPageScroll: function (e) {
    console.log(e);
  },
  onLoad(option) {
    var type = option.type,
      index = option.index

    this.setData({
      activeDetail: activeDetail.detail[type][index],
      showWebType: type
    })
  }

})