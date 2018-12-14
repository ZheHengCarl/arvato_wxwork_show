// pages/sale/good_user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  toIndex:function(){
    wx.navigateTo({
      url: '../index_user/index',
    })
  },

  toCart: function () {
    wx.navigateTo({
      url: '../cart_user/index',
    })
  },

  toOrder: function () {
    wx.navigateTo({
      url: '../order_ensure_user/index',
    })
  }
})