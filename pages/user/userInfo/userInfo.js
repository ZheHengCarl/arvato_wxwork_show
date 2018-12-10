// pages/information/information.js
var app = getApp();
Page({
  data: {
    externalId:'',
    region: ['上海市', '上海市', '闸北区'],
    register: ['微信', '手机'],
    currentTab: 0,
    labelTab: 0
  },

  onLoad: function (options) {

  },

  changeNav: function (e) {
    var index = e.currentTarget.dataset.current;
    this.setData({
      currentTab: index,
      labelTab: 100
    })
  },

  showMore:function(e){
    var index = e.currentTarget.dataset.index;
    //需要隐藏tab的窗口
    this.setData({
      labelTab: index,
      currentTab:100
    })
  }
})
