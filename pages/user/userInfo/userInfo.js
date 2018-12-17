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
    labelchoose:0
  },

  onLoad: function (options) {
    var id = options.id;
    if(!id){
      id = 1;
    }
    console.info(id);
    // 从app.userList里面找出当前ID的用户的信息
    var userList = app.userList;
    for(var i = 0; i < userList.length; i ++){
      var item = userList[i];
      if(item.id == id){
        this.setData({
          currUserInfo: item
        });
      }
    }
    var that = this;
    // 请求默认的标签
    wx.request({
      url: "https://minipro.arvatocrm.cn/arvato/show/json/get",
      data: {
        id: "tagList"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.info(res);
        var tagList = res.data.tagList;
        console.info(tagList.length);
        that.setData({
          tagList: tagList
        })
      }
    })
    
  },

  // 点击拨打电话触发的方法
  phoneClick: function(e){
    var phoneNumber = e.target.dataset.phone;
    console.info(phoneNumber);
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
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
