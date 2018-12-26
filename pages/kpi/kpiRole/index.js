var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var role = options.role;
    var dataList
    if (role == 1) {
      dataList = app.kpidata.storekpi;
    } else {
      dataList = app.kpidata.areakpi;
    }
    console.log(dataList)
    this.setData({
      role: role,
      dataList: dataList
    })
  },
  toDetail: function(e) {
    var role = this.data.role;
    var id = e.currentTarget.dataset.id;
    console.log(role, id);
    wx.navigateTo({
      url: '../detail/detail?role='+role+'&id='+id
    })
  },
  showDemo: function() {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },
})