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
    if(imgs&&imgs.length>0){
      var param = {
        file: imgs[0],
        openId: app.openId,
        name: "Gina",
        mobile: "18788598656"
      }
      console.log(param)
      wx.uploadFile({
        url: app.domain + '/show/infoConfirm',
        filePath: imgs[0],
        name: 'file',
        formData: param,
        success:function(res){
          console.log('submit',res);
        }
        })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先上传个人名片',
        showCancel: false
      })
    }
  },
   
  ignore:function(){
    wx.redirectTo({
      url: '../workbench/workbench',
    })
  }
})