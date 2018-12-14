// pages/sale/good_bc/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },
})