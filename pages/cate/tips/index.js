Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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


  showTap: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，如需查看请点击【面部】。',
      showCancel: false
    })
  },

  totipdetail:function(){
    wx.navigateTo({
      url: '../tipdetail/index',
    })
  }

})