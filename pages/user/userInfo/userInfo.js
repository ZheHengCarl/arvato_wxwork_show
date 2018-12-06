// pages/information/information.js
var app = getApp();
Page({
  data: {
    externalId:''
  },

  onLoad: function (options) {
  },

  getWidthHeight:function(){
    var query = wx.createSelectorQuery();
    //选择id    
    var that =this;
    query.select('.circle').boundingClientRect(function (rect) {
      that.setData({
        circleWidth: rect.width,
        circleHeight: rect.height,
      })
    }).exec();
    var timeout = setTimeout(function () {
      that.setSite()
    }, 800)
  }
})
