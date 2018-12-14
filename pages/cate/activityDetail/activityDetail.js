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
    var that = this;
    var listId = options.listId;
    console.log(listId);
    wx.request({
      url: 'https://minipro.arvatocrm.cn/arvato/wxwork/promotion/get',
      data:{
        promotionId: listId,
        token: app.token
      },
      success:function(res){
        console.log(res)
        var thisList = res.data.data;
        var title = thisList.title
        that.setData({
          listId: listId,
          thisList: thisList,
          title:title
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
    var listId = this.data.listId;
    var title = this.data.title;
    return {
      title: title,
      path: 'pages/wxwork/cate/activityDetail/activityDetail?listId='+listId
    }
  }
})