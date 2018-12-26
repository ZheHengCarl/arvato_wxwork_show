var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataList:app.usersale.userInfo,
      orderList: app.usersale.orderList
    })
  },

  toFind:function(){
    wx.navigateTo({
      url: '../index_user/index',
    })
  },

  toCart: function () {
    wx.navigateTo({
      url: '../cart_user/index',
    })
  },

  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },

  toLogistics: function () {
    wx.navigateTo({
      url: '../logistics/index',
    })
  },

  changeIndex:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      index:index
    })
  }

})