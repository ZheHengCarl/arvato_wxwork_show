var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var title = options.title;
    var yaoYueContent = app.yaoYueContent;
    var content = this.data.content;
    console.log(title, yaoYueContent);
    for (var i = 0; i < yaoYueContent.length;i++){
      if (yaoYueContent[i].title == title){
        content = yaoYueContent[i].content;
        that.setData({
          content: content,
          title:title
        })
        return
      }
    }
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

  }
})