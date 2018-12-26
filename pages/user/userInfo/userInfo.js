// pages/information/information.js
var app = getApp();
Page({
  data: {
    externalId: '',
    avatar: 'http://minipro.arvatocrm.cn/arvato/img/?fileName=avartar.png',
    region: ['上海市', '上海市', '闸北区'],
    register: ['微信', '手机'],
    registerArray: [{
      id: 0,
      name: '微信'
    }, {
      id: 1,
      name: '手机'
    }],
    labelLib: [{
      'labelName': '高富帅',
      'labelchoose': 0
    }, {
      'labelName': 'skr',
      'labelchoose': 0
    }, {
      'labelName': '女汉子',
      'labelchoose': 0
    }, {
      'labelName': '化妆达人',
      'labelchoose': 0
    }, {
      'labelName': '大长腿',
      'labelchoose': 0
    }, {
      'labelName': '白富美',
      'labelchoose': 0
    }, {
      'labelName': '撩妹高手',
      'labelchoose': 0
    }, {
      'labelName': '呆二傻',
      'labelchoose': 0
    }],
    currentTab: 0,
    remarks: 'hello! thank you! thank you very much!',
    labelTab: 0,
    username: 'Gina',
    point: 3250,
    labelchoose: 0,
    index: 0,
    inputValue: '',
    hiddenmodalput: true,
    handLabelList: [],
    handLabel: ''
  },

  onLoad: function(options) {
    var that = this;
    var id = options.id;
    if (!id) {
      id = 1;
    }
    console.info(id);
    // 从app.userList里面找出当前ID的用户的信息
    var userList = app.userList;
    wx.request({
      url: "https://minipro.arvatocrm.cn/arvato/show/json/get",
      data: {
        id: "userinfo"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.info(res);
        var userList = res.data;
        for (var i = 0; i < userList.length; i++) {
          var item = userList[i];
          if (item.id == id) {
            that.setData({
              currUserInfo: item
            });
          }
        }
      }
    })
    // 请求默认的标签
    wx.request({
      url: "https://minipro.arvatocrm.cn/arvato/show/json/get",
      data: {
        id: "tagList"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.info(res);
        var tagList = res.data.data.tagList;
        that.setData({
          tagList: tagList
        })
      }
    })

  },

  // 点击拨打电话触发的方法
  phoneClick: function(e) {
    var phoneNumber = e.target.dataset.phone;
    console.info(phoneNumber);
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },

  removeLabel: function(e) {
    var index = e.currentTarget.dataset.labelindex;
    var tagList = this.data.currUserInfo.tagList;
    tagList.splice(index, 1);
    this.setData({
      ['currUserInfo.tagList']: tagList
    })
  },
  changeNav: function(e) {
    var index = e.currentTarget.dataset.current;
    this.setData({
      currentTab: index,
      labelTab: 100
    })
  },

  showMore: function(e) {
    var index = e.currentTarget.dataset.index;
    //需要隐藏tab的窗口
    this.setData({
      labelTab: index,
      currentTab: 100
    })
  },

  chooseLabel: function(e) {
    var index = e.currentTarget.dataset.labelindex;
    var labelindex = this.data.labelLib[index].labelchoose;
    var chooseState = "labelLib[" + index + "].labelchoose";
    if (labelindex == 0) {
      this.setData({
        [chooseState]: 1
      })
    } else {
      this.setData({
        [chooseState]: 0
      })
    }
  },

  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },

  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  modalinput: function() {
    var handLabelList = this.data.handLabelList;
    if (handLabelList.length == 5){
      wx.showModal({
        title: '提示',
        content: '一次最多添加五个标签',
        showCancel: false
      })
    }else{
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    }
    
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
      inputValue: ''
    });
  },
  confirm: function() {
    var handLabel = this.data.handLabel;
    var handLabelList = this.data.handLabelList;
    if (handLabel.length < 1) {
      wx.showModal({
        title: '提示',
        content: '输入的标签不能为空',
        showCancel: false
      })
    } else {
      handLabelList.push(handLabel);
      this.setData({
        hiddenmodalput: true,
        inputValue: '',
        handLabel:'',
        handLabelList: handLabelList
      });
    }
    console.log(this.data.handLabelList)
  },
  saveLabelName: function(e) {
    var label = e.detail.value;
    this.setData({
      handLabel: label
    })
  },
  removeHandLabel: function(e) {
    var index = e.currentTarget.dataset.addlabelindex;
    var handLabelList = this.data.handLabelList;
    handLabelList.splice(index, 1);
    this.setData({
      handLabelList: handLabelList
    })
  },
  concatLabel: function() {
    var handLabelList = this.data.handLabelList;
    var tagList = this.data.currUserInfo.tagList;
    tagList = tagList.concat(handLabelList);
    handLabelList = []
    this.setData({
      ['currUserInfo.tagList']: tagList,
      handLabelList: handLabelList,
      labelTab: 1
    })
  },

  ensureLibAdd: function() {
    var tagList = this.data.currUserInfo.tagList;
    var labelLib = this.data.labelLib;
    var ensureLibList = [];
    for (var i in labelLib) {
      if (labelLib[i].labelchoose == 1) {
        ensureLibList.push(labelLib[i].labelName)
      }
    }
    tagList = tagList.concat(ensureLibList);
    //去重
    tagList = this.removeDuplicatedItem(tagList);
    this.setData({
      ['currUserInfo.tagList']: tagList,
      labelTab: 1
    })
  },

  removeDuplicatedItem: function(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  },

  toDiscount:function(){
    wx.navigateTo({
      url: '../discount/index',
    })
  }
})