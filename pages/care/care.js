var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coverShow: 0,
    historyOrderShow:0,
    coverContentShow:0,
    previewContentShow: 0,
    currentIndex:0,
    listShow: 1,
    editShow: 0,
    checkedList:[],
    checkedAll:false,
    ctype:'utm27',
    greet:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 界面onload的时候 请求任务列表
    var showOn = this.data.showOn;
    if(!showOn){
      showOn = 1;
    }
    console.info(showOn);
    this.getNccList(showOn);
    
  },

  // 获取需要发送的ncc人员列表
  getNccList: function (showOn){
    var that = this;
    wx.request({
      url: 'https://minipro.arvatocrm.cn/arvato/show/json/get',
      data: {
        id: "care"
      },
      success: function (res) {
        console.log(res);
        app.greet = res.data.today.day27.UTM.greet;
        that.setData({
          today:res.data.today
        })
      }
    })
  },

  historyHide:function(){
    this.setData({
      coverShow: 0,
      historyOrderShow: 0
    })
  },

  showEdit:function(){
    this.setData({
      coverShow: 1,
      coverContentShow: 1,
      greet: app.greet
    })
  },

  hideEdit: function () {
    console.log(app.greet)
    this.setData({
      coverShow: 0,
      coverContentShow: 0, 
      ['currentNccItem.greet']: app.greet
    })
    
  },

  showPreview: function(e){
    var fro = e.currentTarget.dataset.fro;
    this.setData({
      coverShow: 1,
      previewContentShow: 1,
      coverContentShow: 0,
      fro:fro
    })
  },

  hidePreview: function () {
    var fro = this.data.fro;
    this.setData({
      coverShow: 0,
      previewContentShow: 0
    })
    if (fro == '1') {
      this.setData({
        coverShow: 1,
        coverContentShow: 1
      })
    }
  },

  // 点击界面下拉小箭头 展示待发送的人员列表
  showDetail:function(event){
    // 活动类型分为四种 分别是 utm27天 utm55天 utm27天 utm55天
    var today = this.data.today;
    console.log(today);
    // var history = this.data.history
    // var nccList = this.data.nccList;
    var currentNccItem;
    var ctype = event.target.dataset.type;
    this.setData({
      ctype:ctype
    })
    console.log(ctype);
    if(ctype == 'utm27'){
      currentNccItem = today.day27.UTM;
    } else if (ctype == 'nutm27'){
      currentNccItem = today.day27.NUTM;
    } else if (ctype == 'utm55') {
      currentNccItem = today.day55.UTM;
    } else if (ctype == 'nutm55') {
      currentNccItem = today.day55.NUTM;
    }
    // for(var i = 0; i < nccList.length; i ++){
    //   var nccItem = nccList[i];
    //   if(nccItem.ctype == ctype){
    //     currentNccItem = nccItem;
    //   }
    // }
    // 如果当前点击的活动没有人员 则点击下拉框没有反应  
    if (currentNccItem.list.length == 0){
        return;
    }
    // 将全选按钮置为false
    var checkedAll = false;
    this.setData({
      listShow: 0,
      editShow: 1,
      currentNccItem: currentNccItem,
      checkedAll: checkedAll
    })
    
  },

  // 点击界面收缩小箭头 收起待发送的人员列表
  hideDetail: function () {
    this.setData({
      listShow: 1,
      editShow: 0
    })
  },

  // 点击勾选按钮时候的事件
  checkboxChange: function(e){
    var that = this;
    // 获取点击的复选框对应的客户外部联系人ID
    console.info(e.target.id);
    var id = e.target.id;
    var currentNccItem = that.data.currentNccItem;
    var dataList = that.data.currentNccItem.list;
    console.info(dataList);
    for(var i= 0; i < dataList.length; i++){
      var item = dataList[i];
      if (id == item.id){
        if(item.checked == true){
          item.checked = false;
        }else{
          item.checked = true;
        }
      }
    }
    currentNccItem.list = dataList;
    that.setData({
      currentNccItem: currentNccItem
    });
  },

  // 点击全选按钮 
  checkedAll: function(e){
    var currentNccItem = this.data.currentNccItem;
    var dataList = this.data.currentNccItem.list;
    console.info(dataList);
    if (this.data.checkedAll){
      this.data.checkedAll = false;
    }else{
      this.data.checkedAll = true;
    }
    for (var i = 0; i < dataList.length; i++) {
      var item = dataList[i];
      if (item.finishstate != '已完成'){
        item.checked = this.data.checkedAll;
      }
    }
    currentNccItem.list = dataList;
    this.setData({
      currentNccItem: currentNccItem
    });
  },

  // 点击历史
  changeData:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex:index
    })
    // 将当前的nccList置空
    // 同时重新执行一下load方法
    var showOn = index == 0 ? 1 : 2
    this.data.showOn = showOn; 
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
    // 人员列表收缩起来
    this.setData({
      listShow: 1,
      editShow: 0
    })
  },

  // 文本域变化时候触发的方法
  textareaChange: function (e) {
    var value = e.detail.value;
    var currentNccItem = this.data.currentNccItem;
    currentNccItem.greet = value;
    this.setData({
      currentNccItem: currentNccItem
    });
  },

  // 点击保存问候语按钮
  greetSave: function(event){
    var that = this;
    // 发送请求给后台 保存当前的greetContent 并且得到greetId
    var currentNccItem = this.data.currentNccItem; 
    var greet = currentNccItem.greet;
    app.greet = greet
    this.setData({
      coverShow: 0,
      coverContentShow: 0,
    });
  },

  // 点击确认发送时候的按钮
  sendNcc: function (e) {
    // 遍历checkbox 选出其中被勾选的
    var that = this;
    var currentNccItem = that.data.currentNccItem;
    var dataList = currentNccItem.list;
    var selectedExternalUserIds = [];
    var taskIds = ""; 
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].checked == true && dataList[i].status == 0) {
        console.info(dataList[i]);
        selectedExternalUserIds.push(dataList[i].userId);
        taskIds += dataList[i].id + ",";
      }
    }
    var path = 'pages/task/show?greetId=' + this.data.currentNccItem.greetId;
    console.info(path);
    // 调用批量转发接口
    if (selectedExternalUserIds.length == 0){
      return;
    }
    wx.qy.shareAppMessageEx({
      title: "NCC关怀问候",
      imageUrl: "",
      path: path,
      selectedExternalUserIds: selectedExternalUserIds,
      success: function (res) {
        console.info(res);
        // 成功了的话 就将成功了的ID告诉后台
        wx.request({
          url: app.domain + '/admin/wxwork/ncc/task/updateTask',
          data: {
            id: taskIds
          },
          success: function (res) {
            // TODO 发送ajax请求 从中dataList找出后台需要的ID 用逗号拼接发送给后台
            wx.navigateTo({
              url: '/pages/task/task'
            })
          }
        }) 
      },
      fail: function (res) {
        // 失败处理
        console.info(res);
      }
    });
  },

  // 点击拨打电话
  telClick: function(event){
    var mobile = event.target.dataset.mobile;
    console.info("电话号码：" + mobile);
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  
  // 点击聊天
  chatClick: function (event) {
    var chatid = event.target.dataset.chatid;
    console.info("userId>>>>" + chatid);
    wx.qy.openEnterpriseChat({
      externalUserIds: chatid,
      groupName: '',  // 必填，会话名称。单聊时该参数传入空字符串""即可。
      success: function (res) {
        console.log('successres', res)
      },
      fail: function (res) {
        console.log('failres', res)
      }
    });
  }, 
  
  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },

  showTip: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，如需查看请点击【今日】',
      showCancel: false
    })
  },




})


// 人员列表构造函数
function NccItem(ctype, list) {
  this.ctype = ctype;
  this.list = list;
  this.total = list.length;
  this.unfinished = 0;
  // 获取未完成的总数
  this.getUnfinished = function () {
    for(var i = 0; i < list.length; i ++){
      var item = list[i];
      if(item.status == 0){
        this.unfinished++;
      }
    }
  }
  // 获取问候语
  this.getGreet = function(){
    var ctype = this.ctype;
    var that = this;
    wx.request({
      url: app.domain + '/admin/wxwork/ncc/task/getGreetByIdOrStaffId',
      data: {
        id: ctype
      },
      success: function (res) {
        console.info(res);
        var greet = res.data.data[0];
        that.greet = greet.greet;
        that.greetId = greet.id;
      }
    })
  }
  // 设置展开的标题
  this.setTitle = function(){
    if (this.ctype == "utm55" || this.ctype == "nutm55"){
      this.title1 = "入会55天新客";
    }else{
      this.title1 = "入会27天新客";
    }
    if (ctype == "nutm27" || ctype == "nutm55") {
      this.title2 = "NUTM";
    }else{
      this.title2 = "UTM";
    }
  }

}  