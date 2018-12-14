var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffId:'staffe0632b9520964947aaeaecae42451aee'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  deleteList:function(e){
    var that =this;
    var listId = e.target.dataset.param;
    wx.request({
      url: 'https://minipro.arvatocrm.cn/arvato/wxwork/promotion/delete',
      data:{
        promotionId: listId,
        token: app.token
      },
      success:function(res){
        console.log(res);
        if(res.data.code == 200){
          wx.showModal({
            title: '提示',
            content: '删除成功',
            showCancel:false,
            success:function(data){
              if(data.confirm == true){
                that.onShow();
              }
            }
          })
        }
      }
    })
  },
  showList: function (e) {
    var that = this;
    var listId = e.target.dataset.param;
    wx.navigateTo({
      url: '../activityDetail/activityDetail?listId='+listId,
    })
  },
  editList:function(e){
    var listId = e.target.dataset.param;
    wx.navigateTo({
      url: '../message/message?listId=' + listId +'?arvato_test="123"' ,
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
    var that = this;
    var staffId = app.staffId;
    var param = {
      staffId: staffId,
      token: app.token     
      // staffId: this.data.staffId
    }
    wx.request({
      url: 'https://minipro.arvatocrm.cn/arvato/wxwork/promotion/list?arvato_test="123"',
      data: param,
      success: function (res) {
        // console.log(res)
        if (res.data.code == 200) {
          var activityList = res.data.data.data;
          app.activityList = activityList;
          that.setData({
            activityList: activityList
          })
        }
      }
    })
  },

  onReachBottom: function () {
    
  },

})