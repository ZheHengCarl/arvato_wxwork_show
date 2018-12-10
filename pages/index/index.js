var app = getApp();
Page({
  data: {

  },

  onShow:function(){

  },

  onLoad: function() {
    app.domain = "http://localhost:8080/arvato_local_zk";
    // 进来之后先静默登录 
    this.login();
  },
  // 小程序登录
  login: function () {
    wx.login({
      success: function (res) {
        console.info("微信的登录请求发起")
        console.info(res);
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: app.domain + "/show/login",
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.info("登录返回结果");
              console.info(res);
              var flag = res.data.data.hasPhone;
              if (flag == true) {
                // 如果有手机号的话就直接展示轮播图 没有的话就跳转到授权页
                wx.navigateTo({
                  url: "../swiper/swiper"
                })
              } else {
                app.openid = res.data.data.openid;
                app.sessionKey = res.data.data.sessionKey;
                wx.navigateTo({
                  url: "../auth/auth"
                })
              }
            },
            fail: function (res) {
              console.info("发送ajax请求刀" + app.domain + "失败");
              console.info(res);
            }
          })
        }
      },
      fail: function (res) {
        console.info("登陆失败" + res.errMsg);
      }
    });
  }

})