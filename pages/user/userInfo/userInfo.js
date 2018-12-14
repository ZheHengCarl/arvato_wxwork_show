// pages/information/information.js
var app = getApp();
Page({
  data: {
    externalId:'',
    avatar:'http://minipro.arvatocrm.cn/arvato/img/?fileName=avartar.png',
    region: ['上海市', '上海市', '闸北区'],
    register: ['微信', '手机'],
    currentTab: 0,
    remarks:'hello! thank you! thank you very much!',
    labelTab: 0,
    username:'Gina',
    point: 3250,
    labelList: ['关注抗皱紧致', '购物达人', '护肤面膜控', '高价值', '品牌忠实消费者', '白富美'],
    labelchoose:0
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
  },

  chooseLabel:function(e){
    var labelchoose = e.currentTarget.dataset.labelchoose;
    if (labelchoose==0){
      this.setData({
        labelchoose:1
      })
    }else{
      this.setData({
        labelchoose: 0
      })
    }
  }
})
