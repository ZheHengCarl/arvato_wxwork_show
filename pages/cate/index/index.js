// pages/wxwork/cate/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
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

  toVip: function() {
    wx.navigateTo({
      url: '../vip/vip',    
      success: function() {

      }, //成功后的回调；      
      fail: function() {

      },
      //失败后的回调；      
      complete: function() {

      } //结束后的回调(成功，失败都会执行)

    })
  },

  toIntro: function () {
    wx.navigateTo({
      url: '../introduce/index',
    })
  },

  toInvite: function () {
    wx.navigateTo({
      url: '../invite/index',
    })
  },

  toTips: function () {
    wx.navigateTo({
      url: '../tips/index',
    })
  },

  toBrand: function () {
    wx.navigateTo({
      url: '../brand/index',
    })
  },

  download: function () {
    var that = this;
    wx.downloadFile({
      url: 'https://minipro.arvatocrm.cn/arvato/img/?fileName=1546828529694.png',
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showModal({
              title: '提示',
              content: '图片已下载本地相册，您可发朋友圈',
              showCancel: false
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("用户一开始拒绝了，我们想再次发起授权")
              wx.showModal({
                title: '提示',
                content: '您没有授权访问相册权限，无法使用该功能',
                showCancel: false
              })
            }
          }
        })
      }
    })
  },

  showConsult: function () {
    this.setData({
      showShare: 1,
    })
  },

  hideshare: function () {
    this.setData({
      showShare: 0,
    })
  }
})