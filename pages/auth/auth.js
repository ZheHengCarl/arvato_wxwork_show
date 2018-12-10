// pages/auth/auth.js
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 用户点击手机号授权事件
  getPhone: function (res) {
    console.info(res);
    var ency = res.detail.encryptedData;
    var iv = res.detail.iv;
    var sessionKey = app.sessionKey;
    console.info(app);
    if (res.detail.errMsg == 'getPhoneNumber:fail user deny') {
      console.info("用户点击了拒绝。");
    } else {
      console.info("用户点击了同意。");
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
          console.info("后台解密手机号返回的结果:");
          console.info(res);
        },
        fail: function (res) {
          console.info("发送ajax请求刀" + app.domain + "失败");
          console.info(res);
        }
      })
    }
  }



})