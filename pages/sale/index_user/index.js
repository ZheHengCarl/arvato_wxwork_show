Page({
  data: {
    imgUrls: [
      'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/03/95/402a9568fbe5e37f34aa64bba094df0c.jpg',
      'https://images2015.cnblogs.com/blog/1083235/201705/1083235-20170529224430274-470334084.png',
      'https://images2015.cnblogs.com/blog/1083235/201705/1083235-20170529224451586-1329647239.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    margin: 40,
    circular: true,
    role1: 0, 
    coverShow:0,
    currentIndex:0
  },
  
  showDemo:function(){
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel:false
    })
  },

  toMine:function() {
    wx.navigateTo({
      url: '../mine_user/index',
    })
  },
  
  toCart: function () {
    wx.navigateTo({
      url: '../cart_user/index',
    })
  },

  changeNav:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex:index
    })
  },

  toGood: function () {
    wx.navigateTo({
      url: '../good_user/index',
    })
  },

  showChangeRole: function () {
    this.setData({
      coverShow: 1,
      chooseShow: 1
    })
  },

  changeRole1: function (e) {
    var role1 = e.currentTarget.dataset.role1;
    this.setData({
      role1: role1
    })
  },

  changeIndex:function(){
    var role = this.data.role1;
    this.setData({
      coverShow: 0,
      chooseShow: 0
    })
    if (role == 1) {
      wx.navigateTo({
        url: '../index_bc/index'
      })
    }
  }
})