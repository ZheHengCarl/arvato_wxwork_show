var app = getApp();
Page({
  data: {
    coverShow: 0,
    errorShow: 0,
    sale: '123,000',
    saleMoney: '1,230',
    finishPercent: '70',
    hasFinishNum: '123,000',
    goalNum: '176,000',
    finishMember: '3',
    newClientNum: '12',
    newOrderNum: '22',
    month: '',
    monthList: [],
    corpid: 'wxe9bf86cf4a032523',
    _num:1,
    _hide:0,
    scrollTop: 0,
    brand: 'SHISEIDO',
    role1:0
  },

  onShow:function(){
    
  },

  onLoad: function() {
    var that = this;
    app.domain = 'https://minipro.arvatocrm.cn/shiseido';
    this.drawFinish(0.7);
    this.showMonth();

  },

  drawFinish: function(p) {
    var ctx = wx.createCanvasContext('canvasIndex');
    var w = wx.getSystemInfoSync().windowWidth / 2;
    var h = wx.getSystemInfoSync().windowHeight / 2 * 0.5;
    var f = 1 - p;
    ctx.setLineWidth(5);
    ctx.setStrokeStyle('#d2112b');
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

  handletouchtart: function(event) {
    var startX = event.touches[0].pageX;
    var startY = event.touches[0].pageY;
    this.setData({
      startX: startX,
      startY: startY
    })
  },

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
      url: '../care/care',
      success: function () {

      }, //成功后的回调；      
      fail: function () {

      },
      //失败后的回调；      
      complete: function () {

      } //结束后的回调(成功，失败都会执行)

    })
  },

  toMailList: function() {
    wx.navigateTo({
      url: '../user/mailList/mailList',
      success: function() {

      }, //成功后的回调；      
      fail: function() {

      },
      //失败后的回调；      
      complete: function() {

      } //结束后的回调(成功，失败都会执行)

    })
  },

  toSale: function() {
    this.setData({
      coverShow:1,
      chooseShow:1
    })
  },

  loadMore: function() {
    wx.navigateTo({
      url: '../kpi/detail/detail',
      success: function () {

      }, //成功后的回调；      
      fail: function () {

      },
      //失败后的回调；      
      complete: function () {

      } //结束后的回调(成功，失败都会执行)
    })
  },

  changeRole1:function(e){
    var role1 = e.currentTarget.dataset.role1;
    this.setData({
      role1:role1
    })
  },

  toIndex:function(){
    var role = this.data.role1; 
    this.setData({
      coverShow: 0,
      chooseShow: 0
    })
    if(role == 0){
      wx.navigateTo({
        url: '../sale/index_user/index'
      })
    } else if (role == 1){
      wx.navigateTo({
        url: '../sale/index_bc/index'
      })
    }
  }
})