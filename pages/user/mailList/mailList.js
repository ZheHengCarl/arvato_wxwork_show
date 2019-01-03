var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand:'',
    pageSize:15,
    pageNum:1,
    inputValue:'',
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadUser()
  },
  onShareAppMessage(res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'arvato智能工作台',
      path: '/pages/index/index',
      imageUrl: 'https://minipro.arvatocrm.cn/arvato/img/?fileName=1546512521362.png'
    }
  }, 

  searchUser:function(){
    this.loadUser()
  },

  // 加载用户列表 
  loadUser:function(){
    var that = this;
    wx.request({
      url: "https://minipro.arvatocrm.cn/arvato/show/json/get",
      data: {
        id: "userList"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.info(res);
        var userList = res.data;
        console.log('userList', userList)
        app.userList = userList;
        that.setData({
          userList: userList
        })
      }
    })
  },

  toUserDetail:function(e){
    var id = e.currentTarget.dataset.param
    wx.navigateTo({
      url: '../userInfo/userInfo?id=' + id
    })
  },

  getValue:function(e){
    this.setData({
      inputValue:e.detail.value
    })
  },

  showDemo: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  }
})