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

  showDemo: function() {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
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
  }
})