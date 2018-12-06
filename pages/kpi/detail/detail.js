var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finishPercent: '70',
    array:['月计划比','其他指标1','其他指标2'],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.drawFinish(0.7);
    this.setData({
      avatar:app.avatar
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

  drawFinish: function (p) {
    var ctx = wx.createCanvasContext('canvasIndex');
    var w = wx.getSystemInfoSync().windowWidth / 2;
    var h = wx.getSystemInfoSync().windowHeight / 2 * 0.35;
    var f = 1 - p;
    ctx.setLineWidth(5);
    ctx.setStrokeStyle('#d2112b');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(w, h, h - 15, -1 * Math.PI, -f * Math.PI, false);
    ctx.stroke();
    ctx.setStrokeStyle('#dcdcdc');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(w, h, h - 15, -f * Math.PI, 0 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },

  showSort:function(){
    wx.navigateTo({
      url: '../rank/rank',
      success: function () {

      }, //成功后的回调；      
      fail: function () {

      },
      //失败后的回调；      
      complete: function () {

      } //结束后的回调(成功，失败都会执行)

    })
  },

  changeIndex:function(e){
    this.setData({
      index: e.detail.value
    })
  }
})