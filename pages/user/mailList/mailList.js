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
  }
})