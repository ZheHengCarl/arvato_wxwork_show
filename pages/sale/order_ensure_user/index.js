var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price:180,
    num:1,
    count: 180
  },

  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        if (res.model.indexOf("iPhone X") > -1) {
          that.setData({
            isIphoneX: true
          })
        }
      }
    })　
    if (options.num){
      var num = options.num;
    }
    if (app.usersale.cart.goods.price){
      var price = app.usersale.cart.goods.price
    }
    if (options.num && app.usersale.cart.goods.price){
     var count= num * app.usersale.cart.goods.price
    }
    this.setData({
      dataList: app.usersale,
      num: num,
      price: price,
      count: count
    })
  },

  toMine:function(){
    wx.redirectTo({
      url: '../mine_user/index',
    })
  }, 

  toCart: function () {
    wx.redirectTo({
      url: '../cart_user/index',
    })
  },
  
  minus: function (e) {
    var num = e.currentTarget.dataset.num;
    var price = this.data.price;
    if (num > 1) {
      num--;
      this.setData({
        num: num,
        count: price * num
      })
    }
  },

  plus: function (e) {
    var num = e.currentTarget.dataset.num;
    var price = this.data.price;
    var selected = this.data.selected;
    num++;
    this.setData({
      num: num,
      count: price * num
    })
  },
})