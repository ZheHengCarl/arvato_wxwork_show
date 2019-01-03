var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    index1: 0
  },

  onLoad: function() {
    this.setData({
      orderList: app.bcsale.orderList,
      dataList: app.bcsale.orderList
    })
  },

  toFind: function() {
    wx.redirectTo({
      url: '../index_bc/index',
    })
  },

  toMine: function() {
    wx.redirectTo({
      url: '../mine_bc/index',
    })
  },

  showDemo: function() {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，无法使用该功能。',
      showCancel: false
    })
  },

  toworkbench: function() {
    wx.redirectTo({
      url: '../../workbench/workbench',
    })
  },

  changeIndex: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
    var index1 = this.data.index1;
    var list = this.data.dataList;
    var dataList = [];
    var orderList = [];
    console.log(list)
    if (index == '0') {
      dataList = list;
    } else if (index == '1'){
      for(var j in list){
        if(j<10){
          dataList.push(list[j])
        }
      }
    } else if (index == '2') {
      for (var j in list) {
        if (j >= 10) {
          dataList.push(list[j])
        }
      }
    }
    console.log(dataList)
    if (index1 == '0') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '待付款') {
          orderList.push(dataList[i])
        }
      }
    } else if (index1 == '1') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '已付款') {
          orderList.push(dataList[i])
        }
      }
    } else if (index1 == '2') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '已收货') {
          orderList.push(dataList[i])
        }
      }
    } else if (index1 == '3') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '已结算') {
          orderList.push(dataList[i])
        }
      }
    } else if (index1 == '4') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '已失效') {
          orderList.push(dataList[i])
        }
      }
    }
    console.log(orderList)
    this.setData({
      orderList: orderList
    })
  },

  changeIndex1: function(e) {
    var index1 = e.currentTarget.dataset.index1;
    this.setData({
      index1: index1
    })
    var index = this.data.index;
    var list = this.data.dataList;
    var dataList = [];
    var orderList = [];
    console.log(list)
    if (index == '0') {
      dataList = list;
    } else if (index == '1') {
      for (var j in list) {
        if (j < 10) {
          dataList.push(list[j])
        }
      }
    } else if (index == '2') {
      for (var j in list) {
        if (j >= 10) {
          dataList.push(list[j])
        }
      }
    }
    console.log(dataList)
    if (index1 == '0') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '待付款') {
          orderList.push(dataList[i])
        }
      }
    } else if (index1 == '1') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '已付款') {
          orderList.push(dataList[i])
        }
      }
    } else if (index1 == '2') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '已收货') {
          orderList.push(dataList[i])
        }
      }
    } else if (index1 == '3') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '已结算') {
          orderList.push(dataList[i])
        }
      }
    } else if (index1 == '4') {
      for (var i in dataList) {
        console.log(dataList[i].goodstate)
        if (dataList[i].goodstate == '已失效') {
          orderList.push(dataList[i])
        }
      }
    }
    console.log(orderList)
    this.setData({
      orderList: orderList
    })
  }
})