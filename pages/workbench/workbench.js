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
    brand: 'SHISEIDO'
  },

  onShow:function(){
    var that = this;
    wx.getSystemInfo({
      success({ environment }) {
        console.log('environment', environment)
        if (environment != 'wxwork') {
          // 如果运行环境不是在企业微信，做出相应提示
          // that.setData({
          //   coverShow: 1,
          //   errorShow: 1
          // })
        }
      }
    });
  },

  onLoad: function() {
    var that = this;
    app.domain = 'https://minipro.arvatocrm.cn/shiseido';
    this.drawFinish(0.7);
    this.showMonth();
    wx.qy.login({
      success: function(res) {
        console.log('qy.login', res)
        if (res.code) {
          //发起网络请求
          console.log(res.code)
          console.log(that.data.brand)
          wx.request({
            url: app.domain + '/wxwork/minipro/login',
            data: {
              code: res.code,
              brand: that.data.brand
            },
            success: function(res) {
              console.info('qy.login返回的参数', res);
              if(res.data.code == 200){
                app.staffId = res.data.data.staffId;
                app.userNameId = res.data.data.userid;
                app.token = res.data.data.token;
                app.avatar = res.data.data.avatar;
                app.qrCode = res.data.data.qrCode;
                app.name = res.data.data.name;
              }else{
                wx.showModal({
                  title: '提示',
                  content: '员工信息出错'
                })
              }
              
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  },

  openOut: function() {
    var that = this;
    wx.qy.selectExternalContact({
      filterType: 0, //0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人。
      success: function(res) {
        console.log(res)
        var userIds = res.userIds; // 返回此次选择的外部联系人userId列表，数组类型
        console.log('userIds', userIds)
        var param = {
          brand: that.data.brand,
          token: app.token
        };
        var str = '';
        console.log('userIds', userIds)
        console.log('param1', param)
        if (userIds != [] && userIds != null && userIds != undefined) {
          str = userIds.join(',');
          param.externalUserIdsStr = str;
          console.log('param2', param)
          wx.request({
            url: app.domain + '/wxwork/external/check',
            data: param,
            success: function(data) {
              console.log('绑定情况', data);

              // var indexId = [];
              // for (var k = 0; k < data.data.data.hadBindList.length;k++){
              //   indexId.push(data.data.data.hadBindList[k].wxExternalUserid)
              // }
              // console.log("indexId", indexId);
              // wx.qy.shareAppMessageEx({
              //   selectedExternalUserIds: indexId,
              //   success:   function(res)  {         
              //     // 回调  
              //     console.log(res)    
              //   },
              // });
              
              if (data.data.data.hadBindList != undefined && data.data.data.hadBindList.length>=1) {
                var hadBind = [];
                var hadBindStr = '';
                for (var n = 0; n < data.data.data.hadBindList.length; n++) {
                  hadBind.push(data.data.data.hadBindList[n].name)
                }
                
                if (hadBind.length >1){
                  hadBindStr = hadBind.join(' 、');
                }else{
                  hadBindStr = hadBind[0];
                } 
                console.log('招募名单',hadBindStr);
                if (data.data.data.unBindList != undefined && data.data.data.unBindList.length >= 1) {
                  wx.showModal({
                    title: '提示',
                    content: hadBindStr + '已经被招募',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        var unBindList = data.data.data.unBindList;
                        var bindStr = '';
                        var staffId = app.staffId;
                        var brand = that.data.brand;
                        var unBind = [];
                        for (var m = 0; m < unBindList.length; m++) {
                          unBind.push(unBindList[m].wxExternalUserid)
                        }
                        bindStr = unBind.join(',');
                        console.log('绑定参数', bindStr, staffId, brand);
                        wx.request({
                          url: app.domain + '/wxwork/external/bind',
                          data: {
                            externalUserIdsStr: bindStr,
                            brand: brand,
                            staffId: staffId,
                            token: app.token
                          },
                          success: function (res) {
                            console.log(res);
                            if (res.data.code == '200') {
                              wx.showModal({
                                title: '提示',
                                content: '招募成功',
                                showCancel: false,
                                success: function (res) {
                                  if (res.confirm) {
                                    that.toMailList();
                                  }
                                }
                              })
                            } else {
                              wx.showModal({
                                title: '提示',
                                content: '招募失败',
                                showCancel: false,
                                success: function (res) {
                                  if (res.confirm) {
                                    that.toMailList();
                                  } else if (res.cancel) {
                                    that.openOut();
                                  }
                                }
                              })
                            }
                          }
                        })
                      }
                    }
                  });
                }else{
                  wx.showModal({
                    title: '提示',
                    content: hadBindStr + '已经被招募',
                    showCancel: false,
                    success: function (res) {
                      if(res.confirm){
                        that.toMailList();
                      }
                    }
                  })
                }
              }else{
                if (data.data.data.unBindList != undefined && data.data.data.unBindList.length >= 1) {
                  var unBindList = data.data.data.unBindList;
                  var bindStr = '';
                  var staffId = app.staffId;
                  var brand = that.data.brand;
                  var unBind = [];
                  for (var m = 0; m < unBindList.length; m++) {
                    unBind.push(unBindList[m].wxExternalUserid)
                  }
                  bindStr = unBind.join(',');
                  console.log('绑定参数', bindStr, staffId, brand);
                  wx.request({
                    url: app.domain + '/wxwork/external/bind',
                    data: {
                      externalUserIdsStr: bindStr,
                      brand: brand,
                      staffId: staffId,
                      token: app.token
                    },
                    success: function (res) {
                      console.log(res);
                      if (res.data.code == '200') {
                        wx.showModal({
                          title: '提示',
                          content: '招募成功',
                          showCancel: false,
                          success: function (res) {
                            if (res.confirm) {
                              that.toMailList();
                            }
                          }
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '招募失败',
                          showCancel: false,
                          success: function (res) {
                            if (res.confirm) {
                              that.toMailList();
                            } else if (res.cancel) {
                              that.openOut();
                            }
                          }
                        })
                      }
                    }
                  })
                }
              } 
            }
          })
        }
      }
    });
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

  toPersonal: function() {
    wx.navigateTo({
      url: '../personal/personal',
      success: function() {

      }, //成功后的回调；      
      fail: function() {

      },
      //失败后的回调；      
      complete: function() {

      } //结束后的回调(成功，失败都会执行)
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
})