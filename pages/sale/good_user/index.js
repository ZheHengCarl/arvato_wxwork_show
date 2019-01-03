// pages/sale/good_user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad:function(){
    var that = this
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
  },
  
  toIndex:function(){
    wx.redirectTo({
      url: '../index_user/index',
    })
  },

  toCart: function () {
    wx.redirectTo({
      url: '../cart_user/index',
    })
  },

  toOrder: function () {
    wx.redirectTo({
      url: '../order_ensure_user/index',
    })
  }
})