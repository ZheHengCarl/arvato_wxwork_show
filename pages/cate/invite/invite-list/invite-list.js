var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand: 'AUPRES'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var brand = this.data.brand;
    var yaoYueList = [];
    var yaoYueContent = [];
    wx.request({
      url: 'https://minipro.arvatocrm.cn/arvato/wxwork/invitation/jsonstr',
      data: {token: app.token},
      success:function(res){
        var data = res.data.data;
        data = data.replace(" ", "");
        if (typeof data != 'object') {
          data = data.replace(/\ufeff/g, "");
          data = JSON.parse(data);
        }
        var common = data.ALL;
        var inviteList = data[brand];
        yaoYueContent.push(common);
        if (inviteList != null && inviteList != undefined && inviteList!=[]){
          for (var i = 0; i < inviteList.length;i++){
            yaoYueContent.push(inviteList[i])
          }
        }
        console.log(yaoYueContent);
        app.yaoYueContent = yaoYueContent
        that.setData({
          list: yaoYueContent
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toInviteDetail: function (e) {
    var listTitle = e.currentTarget.dataset.param;
    console.log(listTitle)
    wx.navigateTo({
      url: '../invite-detail/invite-detail?title='+listTitle,
      success: function () {

      }, //成功后的回调；      
      fail: function () {

      },
      //失败后的回调；      
      complete: function () {

      } //结束后的回调(成功，失败都会执行)

    })
  }
})