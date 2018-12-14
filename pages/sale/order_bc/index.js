// pages/sale/order_bc/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    index1:0
  },

  toFind: function () {
    wx.navigateTo({
      url: '../index_bc/index',
    })
  },

  toMine: function () {
    wx.navigateTo({
      url: '../mine_bc/index',
    })
  },

  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },

  changeIndex:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      index:index
    })
  },

  changeIndex1: function (e) {
    var index1 = e.currentTarget.dataset.index1;
    this.setData({
      index1: index1
    })
  }
})