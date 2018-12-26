var app = getApp();
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
    var dataList = app.kpidata;
    var rankData = dataList.areakpi.rank;
    console.log(rankData);
    this.setData({
      rank: rankData
    })
  },
  
  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  }
})