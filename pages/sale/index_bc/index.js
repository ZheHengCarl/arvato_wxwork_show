var app= getApp()
Page({
  data: {
    imgUrls: ['http://minipro.arvatocrm.cn/arvato/img/?fileName=1545644255640.png'],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    margin: 0,
    circular: true,
    currentIndex: 0,
    role1: 1,
    coverShow: 0,
    currentIndex: 0
  },

  onLoad:function(){
    var that = this;
    wx.request({
      url: "https://minipro.arvatocrm.cn/arvato/show/json/get",
      data: {
        id: "sale"
      },
      success: function (res) {
        console.info(res);
        app.bcsale = res.data.bc;
        that.setData({
          dataList: res.data.bc.goodsList
        })
      }
    })
  },

  changeNav: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
  },

  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },

  toOrder:function(){
    wx.navigateTo({
      url: '../order_bc/index',
    })
  },

  toMine: function () {
    wx.navigateTo({
      url: '../mine_bc/index',
    })
  },

  toGood: function () {
    wx.navigateTo({
      url: '../good_bc/index',
    })
  }, 
  
  showChangeRole: function () {
    this.setData({
      coverShow: 1,
      chooseShow: 1
    })
  },

  changeRole1: function (e) {
    var role1 = e.currentTarget.dataset.role1;
    this.setData({
      role1: role1
    })
  },

  changeIndex: function () {
    var role = this.data.role1;
    this.setData({
      coverShow: 0,
      chooseShow: 0
    })
    if (role == 0) {
      wx.navigateTo({
        url: '../index_user/index'
      })
    }
  }
})