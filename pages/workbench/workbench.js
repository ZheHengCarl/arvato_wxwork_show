var app = getApp();
Page({
  data: {
    coverShow: 1,
    errorShow: 0,
    choiceShow:1,
    month: '',
    monthList: [],
    corpid: 'wxe9bf86cf4a032523',
    _num:1,
    _hide:0,
    scrollTop: 0,
    role1:0,
    role:0
  },

  onShow:function(){
    
  },

  onLoad: function() {
    var that = this;
    var dataList;
    app.domain = 'https://minipro.arvatocrm.cn/shiseido';
    this.drawFinish(0.7);
    this.showMonth();
    wx.request({
      url: "https://minipro.arvatocrm.cn/arvato/show/json/get",
      data: {
        id: "kpi"
      },
      success: function (res) {
        console.info(res);
        app.kpidata = res.data;
        var role = that.data.role;
        if(role == 0){
          dataList = res.data.bckpi.home;
        }else if(role == 1){
          dataList = res.data.storekpi.home;
        }else{
          dataList = res.data.areakpi.home;
        }
        console.log(dataList)
        that.setData({
          dataList: dataList
        })
      }
    })
  },

  drawFinish: function(p) {
    var ctx = wx.createCanvasContext('canvasIndex');
    var w = wx.getSystemInfoSync().windowWidth / 2;
    var h = wx.getSystemInfoSync().windowHeight / 100*27;
    console.log(w,h)
    var f = 1 - p;
    ctx.setLineWidth(5);
    ctx.setStrokeStyle('#DA202B');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(w, h, h-30, -1 * Math.PI, -f * Math.PI, false);
    ctx.stroke();    
    ctx.setStrokeStyle('#dcdcdc');    
    ctx.setLineCap('round');    
    ctx.beginPath();    
    ctx.arc(w, h, h-30, -f * Math.PI, 0 * Math.PI, false); 
    ctx.stroke();    
    ctx.draw();
  },

  showTip: function () {
    wx.showModal({
      title: '提示',
      content: '很遗憾，此版本仅为演示版，如需查看请点击【今日】',
      showCancel: false
    })
  },

  countMonth: function(n) {
    var m = [];
    var thisMonth = new Date().getMonth() + 1;
    if (n < 11 && n > 2) {
      m = [n - 2, n - 1, n, n + 1, n + 2];
    } else if (n > 10 && n < 12) {
      m = [n - 2, n - 1, n, n + 1, n + 2 - 12];
    } else if (n > 11 && n < 13) {
      m = [n - 2, n - 1, n, n + 1 - 12, n + 2 - 12];
    } else if (n > 0 && n < 2) {
      m = [n - 2 + 12, n - 1 + 12, n, n + 1, n + 2];
    } else if (n > 1 && n < 3) {
      m = [n - 2 + 12, n - 1, n, n + 1, n + 2];
    }
    for (var i in m) {
      if (m[i] == thisMonth) {
        m[i] = '本'
      }
    }
    this.setData({
      monthList: m,
      month: n
    })
  },

  showMonth: function() {
    var thisMonth = new Date().getMonth() + 1;
    this.countMonth(thisMonth);
  },

  // handletouchtart: function(event) {
  //   var startX = event.touches[0].pageX;
  //   var startY = event.touches[0].pageY;
  //   this.setData({
  //     startX: startX,
  //     startY: startY
  //   })
  // },

  showHideBtn: function() {
    this.setData({
      _hide:1
    })
  },

  handletouchend: function(event) {
    var currentX = event.changedTouches[0].pageX;
    var currentY = event.changedTouches[0].pageY;
    var startX = this.data.startX;
    var startY = this.data.startY;
    var tx = currentX - startX;
    var ty = currentY - startY;
    var month = this.data.month;
    //左右滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < -50) {
        if (month == 12) {
          month = month + 1 - 12; //明年1月
        } else {
          month = month + 1;
        }
      } else if (tx > 50) {
        if (month == 1) {
          month = month - 1 + 12; //去年12月
        } else {
          month = month - 1;
        }
      }
    }
    this.countMonth(month);
  },

  opertouchend: function(event){
    var currentX = event.changedTouches[0].pageX;
    var currentY = event.changedTouches[0].pageY;
    var startX = this.data.startX;
    var startY = this.data.startY;
    var tx = currentX - startX;
    var ty = currentY - startY;
    //左右滑动
    if (Math.abs(tx) <= Math.abs(ty)) {
      if (ty < -50){
        this.showHideBtn()
      }else if (ty > 50){
        var _hide = this.data._hide;
        if (_hide == 1) {
          this.setData({
            _hide: 0
          })
        }
      }
        
    }
  },

  changeDate:function(e){
    this.setData({
      _num: e.target.dataset.num
    })
  },

  changeMonth:function(e){
    var month = e.target.dataset.month;
    var thisMonth = new Date().getMonth() + 1;
    if (month == '本'){//如果是本月，则换成当前月份
      month = thisMonth
    }
    this.countMonth(month);
  },

  toCate: function() {
    wx.navigateTo({
      url: '../cate/index/index',
      success: function() {

      }, //成功后的回调；      
      fail: function() {

      },
      //失败后的回调；      
      complete: function() {

      } //结束后的回调(成功，失败都会执行)

    })
  },

  toCare: function () {
    wx.navigateTo({
      url: '../care/care'
    })
  },

  toMailList: function() {
    wx.navigateTo({
      url: '../user/mailList/mailList'
    })
  },

  toSale: function() {
    this.setData({
      coverShow:1,
      chooseShow:1
    })
  },

  loadMore: function() {
    var role = this.data.role;
    if(role == 0){
      wx.navigateTo({
        url: '../kpi/detail/detail?role=' + role +'&id=1001101'
      })
    }else{
      wx.navigateTo({
        url: '../kpi/kpiRole/index?role=' + role
      })
    }
  },

  changeRole1:function(e){
    var role1 = e.currentTarget.dataset.role1;
    this.setData({
      role1:role1
    })
  },

  changeRole: function (e) {
    var role = e.currentTarget.dataset.role;
    var dataList;
    if (role == 0) {
      dataList = app.kpidata.bckpi.home;
    } else if (role == 1) {
      dataList = app.kpidata.storekpi.home;
    } else {
      dataList = app.kpidata.areakpi.home;
    }
    this.setData({
      role: role,
      dataList: dataList
    })
  },

  toIndex:function(){
    var role = this.data.role1; 
    this.setData({
      coverShow: 0,
      chooseShow: 0
    })
    if(role == 0){
      wx.redirectTo({
        url: '../sale/index_user/index'
      })
    } else if (role == 1){
      wx.redirectTo({
        url: '../sale/index_bc/index'
      })
    }
  },

  ensureRole:function(){
    this.setData({
      coverShow: 0,
      choiceShow: 0
    })
  },

  showChangeRole:function(){
    this.setData({
      coverShow: 1,
      choiceShow: 1
    })
  }
})