var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price:180
  },

  onLoad: function (options) {
    var num = options.num;
    this.setData({
      dataList: app.usersale,
      num: num,
      price: app.usersale.cart.goods.price,
      count: num * app.usersale.cart.goods.price
    })
  },

  toMine:function(){
    wx.navigateTo({
      url: '../mine_user/index',
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