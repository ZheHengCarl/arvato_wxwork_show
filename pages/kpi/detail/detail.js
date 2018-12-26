var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var role = options.role;
    var id = options.id;
    var dataList = app.kpidata;
    var kpi;
    console.log(role, id, dataList);
    if(role==0){
      kpi = dataList.bckpi;
    }else if(role == 1){
      if(id.length ==7){
        for (var i in dataList.storekpi.bcList) {
          if (id == dataList.storekpi.bcList[i].userid) {
            kpi = dataList.storekpi.bcList[i]
          }
        }
      }else{
        kpi = dataList.storekpi.storeList[0]
      }
    }else if(role == 2){
      if (id.length == 5) {
        for (var i in dataList.storekpi.storeList) {
          if (id == dataList.storekpi.storeList[i].userid) {
            kpi = dataList.storekpi.storeList[i]
          }
        }
      } else {
        kpi = dataList.areakpi.areaList[0]
      }
    }
    this.setData({
      role:role,
      kpi:kpi
    })
    console.log(kpi)
    this.drawFinish(0.7);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  drawFinish: function (p) {
    var ctx = wx.createCanvasContext('canvasIndex');
    var w = wx.getSystemInfoSync().windowWidth / 2;
    var h = wx.getSystemInfoSync().windowHeight / 2 * 0.35;
    var f = 1 - p;
    ctx.setLineWidth(5);
    ctx.setStrokeStyle('#DA202B');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(w, h, h - 15, -1 * Math.PI, -f * Math.PI, false);
    ctx.stroke();
    ctx.setStrokeStyle('#dcdcdc');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(w, h, h - 15, -f * Math.PI, 0 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },

  showSort:function(){
    var role = this.data.role;
    wx.navigateTo({
      url: '../rank/rank?role='+role
    })
  },

  changeIndex:function(e){
    this.setData({
      index: e.detail.value
    })
  }
})