var app = getApp();
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    margin: 40,
    circular: true,
    role1: 0,
    coverShow: 0,
    currentIndex: 0
  },

  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        if (res.model.indexOf("iPhone X") > -1) {
          that.setData({
            isIphoneX: true
          })
        }
      }
    })　
    wx.request({
      url: "https://minipro.arvatocrm.cn/arvato/show/json/get",
      data: {
        id: "sale"
      },
      success: function(res) {
        console.info(res);
        app.usersale = res.data.user;
        that.setData({
          dataList:res.data.user.goodsList
        })
      }
    })
  },

  onShareAppMessage(res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'arvato智能工作台',
      path: '/pages/index/index',
      imageUrl: 'https://minipro.arvatocrm.cn/arvato/img/?fileName=1546512521362.png'
    }
  }, 

  showDemo: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false,
      success:function(res){
        if(res.confirm){
          that.showConsult();
        }
      }
    })
  },

  showTip:function(){
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，如需查看请点击【热卖】',
      showCancel: false
    })
  },

  toMine: function() {
    wx.redirectTo({
      url: '../mine_user/index',
    })
  },

  toCart: function() {
    wx.redirectTo({
      url: '../cart_user/index',
    })
  },

  changeNav: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
  },

  toGood: function() {
    wx.redirectTo({
      url: '../good_user/index',
    })
  },

  toworkbench: function () {
    wx.redirectTo({
      url: '../../workbench/workbench',
    })
  },

  showChangeRole: function() {
    this.setData({
      coverShow: 1,
      chooseShow: 1
    })
  },

  changeRole1: function(e) {
    var role1 = e.currentTarget.dataset.role1;
    this.setData({
      role1: role1
    })
  },

  changeIndex: function() {
    var role = this.data.role1;
    this.setData({
      coverShow: 0,
      chooseShow: 0
    })
    if (role == 1) {
      wx.redirectTo({
        url: '../index_bc/index'
      })
    }
  },

  download: function () {
    var that = this;
    wx.downloadFile({
      url: 'https://minipro.arvatocrm.cn/arvato/img/?fileName=1546828529694.png',
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showModal({
              title: '提示',
              content: '图片已下载本地相册，您可发朋友圈',
              showCancel: false
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("用户一开始拒绝了，我们想再次发起授权")
              wx.showModal({
                title: '提示',
                content: '您没有授权访问相册权限，无法使用该功能',
                showCancel: false
              })
            }
          }
        })
      }
    })
  },

  showConsult: function () {
    this.setData({
      showShare: 1,
      coverShow: 1
    })
  },

  hideshare: function () {
    this.setData({
      showShare: 0,
      coverShow: 0
    })
  }
})