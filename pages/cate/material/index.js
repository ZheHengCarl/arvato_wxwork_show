// pages/cate/material/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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


  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },

  tomaterialdetail:function(){
    wx.navigateTo({
      url: '../materialdetail/index',
    })
  }

})