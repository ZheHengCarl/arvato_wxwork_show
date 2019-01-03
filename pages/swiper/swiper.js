//获取应用实例
var app = getApp()
Page({
  data: {
    imageList: [
      'https://minipro.arvatocrm.cn/arvato/img/?fileName=1545019540267.png', 'https://minipro.arvatocrm.cn/arvato/img/?fileName=1545019550607.png',
      'https://minipro.arvatocrm.cn/arvato/img/?fileName=1545019559956.png',
      'https://minipro.arvatocrm.cn/arvato/img/?fileName=1545019569727.png',
      'https://minipro.arvatocrm.cn/arvato/img/?fileName=1545019578610.png',
      'https://minipro.arvatocrm.cn/arvato/img/?fileName=1545019587758.png'
    ],
    //是否采用衔接滑动 
    circular: false,
    //是否显示画板指示点
    indicatorDots: true,
    //选中点的颜色  
    indicatorcolor: "#000",
    //是否竖直  
    vertical: false,
    //是否自动切换  
    autoplay: false,
    //滑动动画时长毫秒  
    duration: 500,
    //所有图片的高度  
    imgheights: [],
    //图片宽度  
    imgwidth: 750,
    //默认  
    current: 0,
    index: 0
  },
  onLoad: function(param) {

  },

  // 轮播图样式设置
  imageLoad: function(e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里  
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },

  // 获取当前的轮播图的index 如果当前是最后一张轮播简介(index == 5)
  getCurrIndex: function(e) {
    var index = e.detail.current;
    // console.info(index);
    if (index == 5) {
      this.setData({
        index: 5
      })
    }
  },

  towork: function() {
    // 跳转到选择用户身份页
    // console.log(app.hasPhone)
    console.log(app.openId)
    var url = app.domain + "/show/getPic";
    wx.request({
      url: url,
      method: "POST",
      data: {
        openId: app.openId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        // console.log(res.data.data.hasPic)
        if (res.data.data.hasPic) {
          wx.redirectTo({
            url: "../workbench/workbench"
          })
        } else {
          wx.redirectTo({
            url: "../info/index"
          })
        }
      }
    })
  },

  handletouchtart: function(event) {
    var startX = event.touches[0].pageX;
    var startY = event.touches[0].pageY;
    this.setData({
      startX: startX,
      startY: startY
    })
  },

  handletouchend: function(event) {
    var currentX = event.changedTouches[0].pageX;
    var currentY = event.changedTouches[0].pageY;
    var startX = this.data.startX;
    var startY = this.data.startY;
    var tx = currentX - startX;
    var ty = currentY - startY;
    //左右滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < -50) {
        console.log('左滑')
      } else if (tx > 50) {
        console.log('右划');
      }
    }
  },

  stopmove: function() {
    return false
  }
})