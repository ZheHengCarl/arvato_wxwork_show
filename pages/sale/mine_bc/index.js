var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0
  },

  onLoad:function(){
    this.setData({
      dataList:app.bcsale.detail
    })
  },

  toFind: function () {
    wx.redirectTo({
      url: '../index_bc/index',
    })
  },

  toOrder: function () {
    wx.redirectTo({
      url: '../order_bc/index',
    })
  },

  toDetail: function () {
    wx.navigateTo({
      url: '../detail_bc/index',
    })
  },

  toworkbench: function () {
    wx.redirectTo({
      url: '../../workbench/workbench',
    })
  },

  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },

  changeIndex: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
  },
})