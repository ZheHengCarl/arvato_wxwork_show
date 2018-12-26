// pages/auth/auth.js
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
      wx.login({
        success:function(res){
          // console.log(res)
        }
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 用户点击手机号授权事件
  getPhone: function (res) {
    console.info(res);
    if (res.detail.errMsg == 'getPhoneNumber:ok') {
      console.info("用户点击了同意。");
      var ency = res.detail.encryptedData;
      var iv = res.detail.iv;
      var sessionKey = app.sessionKey;
      var data = {
        encryptedData: ency,
        iv: iv,
        sessionKey: sessionKey,
        openId: app.openId
      }
      console.info(data);
      // 同意获取手机号就发送请求给后台 解密手机号
      wx.request({
        url: app.domain + "/show/phone",
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          
          wx.redirectTo({
            url: "../swiper/swiper"
          })
        },
        fail: function (res) {
          console.info("发送ajax请求刀" + app.domain + "失败");
          console.info(res);
          // 解密成功或者失败都跳转到轮播图页
          wx.redirectTo({
            url: "../swiper/swiper"
          })
        }
      })
    } else {
      // 点击拒绝停留在此界面
      console.info("用户点击了拒绝。");
    }
  }



})