var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    count: 0,
    price: 180,
    selected: 0
  },

  onLoad: function () {
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
    this.setData({
      dataList: app.usersale.cart,
      num: app.usersale.cart.goods.count
    })
  },

  minus: function (e) {
    var num = e.currentTarget.dataset.num;
    var price = this.data.price;
    var selected = this.data.selected;
    if (num > 1) {
      num--;
      this.setData({
        num: num,
        count: price * num * selected
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
      count: price * num * selected
    })
  },

  toEnsureOrder:function(){
    var num = this.data.num;
    var count = this.data.count;
    if(count!=0){
      wx.redirectTo({
        url: '../order_ensure_user/index?num=' + num,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先勾选商品',
        showCancel:false
      })
    }
    
  },

  changeSelect: function (e) {
    var select = e.currentTarget.dataset.select;
    var price = this.data.price;
    var num = this.data.num;
    console.log(select)
    if (select == 1) {
      this.setData({
        selected: 0,
        count: 0
      })
    } else {
      this.setData({
        selected: 1,
        count: price * num
      })
    }
  },

  showDemo: function (e) {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  }, 
  
  toMine: function () {
    wx.redirectTo({
      url: '../mine_user/index',
    })
  },

  toIndex: function () {
    wx.redirectTo({
      url: '../index_user/index',
    })
  },

  changeNav: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
  },

  toGood: function () {
    wx.redirectTo({
      url: '../good_user/index',
    })
  },

  toworkbench: function () {
    wx.redirectTo({
      url: '../../workbench/workbench',
    })
  },
})