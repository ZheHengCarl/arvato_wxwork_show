Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 2,
    count: 0,
    price: 189,
    selected: 0
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
    wx.navigateTo({
      url: '../order_ensure_user/index',
    })
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
  }
})