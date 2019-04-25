//detail.js
//获取应用实例
const app = getApp()
// var activeDetail = require('../../utils/detail.js');
var request = require('../../utils/requestService.js'); //require请求
var WxParse = require('../../wxParse/wxParse.js');
var formatTime = require('../../utils/util.js');

Page({
  data: {
    imgvideostill: [],
    indicatorDots: true, //点
    autoplay: false, //循环
    interval: 5000, //等待时间
    duration: 1000, //切换时间
    circular: false, //无缝连接
    collectNum: false, //收藏
    activeDetail: {}, //活动详情
    showWebType: '', //显示的页面
    activeContent: '', //内容
    newComment: '', //新的评论
    comments: [], //评论列表
    showComment: false, //是否显示评论
  },
  //打开评论弹出层
  toggleDialogHandle() {
    this.showDialog = !this.showDialog;
    this.setData({
      showDialog: this.showDialog
    })
  },
  //打开输入弹框
  toggleEditCoomentBox() {
    this.showEditCooment = !this.showEditCooment;
    this.setData({
      showEditCooment: this.showEditCooment
    })
  },
  choiceCollectFun() {
    let collectNum = !this.data.collectNum;
    if (collectNum) {
      var postUrl = `collect/add`,
        postData = {
          userId: wx.getStorageSync('userId'),
          activityId: this.data.activeContent.id,
        },
        that = this;
      request.requestPost(postUrl, postData)
        .then(function (response) {
          console.log(response);

        }, function (error) {
          console.log(error);
        });
    }
    this.setData({
      collectNum
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
    var urls = [];
    for (var index in imgList) {
      urls.push(imgList[index].imgurl)
    }
    // //图片预览
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })

  },
  // gomap(e) {
  //   var position = e.currentTarget.dataset.position
  //   wx.navigateTo({
  //     url: `../webview/webview?url=https://www.appsun.com.cn/www/fy/changning/map/index.html&endsouth=${position[1]}&endwest=${position[0]}`
  //   })
  // },
  getActivityList(activeid) { //获取活动
    var getUrl = `activity/list`,
      getData = {
        id: activeid
      },
      that = this;
    request.requestGet(getUrl, getData)
      .then(function (response) {
        console.log(response.data.data.parameterType[0]);

        var activeContent = response.data.data.parameterType[0]
        if (activeContent.activityBeginTime) {
          var time = activeContent.activityBeginTime;
          console.log(time);
          activeContent.activityBeginTime = formatTime.formatTime(time, 'Y/M/D')
        }
        if (activeContent.activityEndTime) {
          activeContent.activityEndTime = formatTime.formatTime(activeContent.activityEndTime, 'Y/M/D')
        }
        if (activeContent.still) {
          var imgvideostill = activeContent.still.split(",")
        }

        that.setData({
          activeContent,
          showComment: true,
          imgvideostill
        })

        // 绑定html
        var article = that.data.activeContent.activityDec
        WxParse.wxParse('article', 'html', article, that, 0);
        that.getComment();
        console.log(that.data.activeContent);
      }, function (error) {
        console.log(error);
      });
  },
  // 把用户输入的评论保存到变量里
  bindNewComment: function (e) {
    this.data.newComment = e.detail.value;
  },
  // 添加评论
  submitComment() {
    var that = this
    // 如果评论输入为空，则提示用户输入，不进行提交
    if (!this.data.newComment) {
      wx.showToast({
        title: '请输入评论'
      });
    } else {
      that.addComment();
    }
  },
  //添加评论
  addComment() {
    var postUrl = `collect/andComment`,
      postData = {
        userId: wx.getStorageSync('userId'),
        activityId: this.data.activeContent.id,
        commentDes: this.data.newComment,
      },
      that = this;
    request.requestPost(postUrl, postData)
      .then(function (response) {
        console.log(response);
        that.getComment();
        that.toggleEditCoomentBox();
        that.addSaveIntegralDetaDetail();
      }, function (error) {
        console.log(error);
      });
  },
  //新增评论积分
  addSaveIntegralDetaDetail() {
    var postUrl = `integral/saveIntegralDetaDetail`,
      postData = {
        userId: wx.getStorageSync('userId'),
        integralType: 3,
        integralPrice: 1,
      },
      that = this;
    request.requestPost(postUrl, postData)
      .then(function (response) {
        console.log(response);
      }, function (error) {
        console.log(error);
      });
  },
  // 查询评论
  getComment() {
    var getUrl = `collect/listComment`,
      getData = {
        activityId: this.data.activeContent.id,
      },
      that = this;
    request.requestGet(getUrl, getData)
      .then(function (response) {
          var listComment=response.data.data.parameterType
          listComment.forEach(function (value, key) {
            listComment[key].commentTime=value.commentTime.slice(0,19)
          })
          that.setData({
            comments: listComment
          })
        },
        function (error) {
          console.log(error);
        });
  },
  onLoad(option) {
    console.log(option.id)
    this.getActivityList(option.id)
    // this.getActivityList('90')
  }



})