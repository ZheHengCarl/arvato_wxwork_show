var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand:'',
    pageSize:10,
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

  loadUser:function(){
    var that = this;
    var staffId = app.staffId;
    var token = app.token;
    var param = {
      brand: that.data.brand,
      pageNum: 1,
      keyword: that.data.inputValue,
      pageSize: that.data.pageSize,
      staffId: staffId,
      token:token
    };
    console.log('param', param)
    wx.request({
      url: app.domain + '/wxwork/external/list',
      data: param,
      success: function (res) {
        console.log(res);
        if (res.data.code == '200') {
          if (res.data.data.data.length != 0 && res.data.data.data != null && res.data.data.data != undefined){
            var userList = res.data.data.data;
            var total = res.data.data.total;
            console.log('userList', userList)
            that.setData({
              userList: userList,
              total: total
            })
          }else{
            that.setData({
              userList: [],
              total: 0
            })
            wx.showModal({
              title: '提示',
              content: '没有更多客户信息',
              showCancel:false
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '请求客户通讯录失败',
            showCancel: false
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that= this;
    var pageNum = that.data.pageNum; 
    var staffId = app.staffId;
    pageNum++;
    that.setData({
      pageNum: pageNum
    })
    var param = {
      brand: that.data.brand,
      pageNum: pageNum,
      inputValue: that.data.inputValue,
      pageSize: that.data.pageSize,
      staffId: staffId,
      token: app.token
    };
    console.log('param', param)
    wx.request({
      url: app.domain + '/wxwork/external/list',
      data: param,
      success: function (res) {
        console.log('更多',res);
        if (res.data.code == '200') {
          var userList = res.data.data.data;
          var total = res.data.data.total;
          var nextUserList = that.data.userList;
          nextUserList = nextUserList.concat(userList);
          console.log(nextUserList)
          that.setData({
            userList: nextUserList
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请求客户通讯录失败',
            showCancel:false
          })
        }
      }
    })
  },

  toUserDetail:function(e){
    var externalId = e.currentTarget.dataset.param
    wx.navigateTo({
      url: '../user/user?externalId=' + externalId
    })
  },

  getValue:function(e){
    this.setData({
      inputValue:e.detail.value
    })
  }
})