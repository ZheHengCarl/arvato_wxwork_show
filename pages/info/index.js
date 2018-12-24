// pages/info/index.js
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
  onLoad: function (options) {

  },

  chooseImg: function () {
    var that = this;
    var imgs;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        imgs = [];
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          imgs.push(tempFilePaths[i]);
        }
        that.setData({
          imgs: imgs,
          num: 0
        });
      }
    })
  },

  submit:function(){
    var imgs = this.data.imgs;
    if(imgs.length==0){
      wx.showModal({
        title: '提示',
        content: '请先上传个人名片',
      })
    }
    var param = {
      img:imgs[0],
      username:"Gina",
      phone:"18788598656"
    }
    wx.request({
      url: app.domain+'/show/infoConfirm',
      data:param,
      success:function(res){
        console.log(res)
      },
      complete:function(){
        wx.redirectTo({
          url: '../workbench/workbench',
        })
      }
    })
  }
})