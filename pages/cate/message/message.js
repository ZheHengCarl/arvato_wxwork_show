var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  onLoad: function(options) {
    var that = this;
    var listId = options.listId;
    var activityList = app.activityList;
    var thisList = {};
    if (activityList != undefined && activityList != null) {
      for (var i = 0; i < activityList.length; i++) {
        if (activityList[i].promotionId == listId) {
          thisList = activityList[i];
          console.log(listId, thisList);
          that.setData({
            thisList: thisList,
            isEdit: listId,
            num: 1
          })
          return
        }
      }
    }
  },

  onReady: function() {

  },

  titleText: function(e) {
    this.setData({
      title: e.detail.value
    });
  },

  contentText: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  chooseImg: function() {
    var that = this;
    var imgs = that.data.imgs;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res);
        imgs = [];
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          imgs.push(tempFilePaths[i]);
        }
        that.setData({
          imgs: imgs,
          num: 0
        });
      }
    })
  },

  previewImg: function(e) {
    //获取当前图片的下标
    var imgs = this.data.imgs;
    console.log(imgs)
    wx.previewImage({
      //当前显示图片
      current: '',
      //所有图片
      urls: imgs
    })

  },

  upload: function(page, path) {
    var that = this;
    var isEdit = that.data.isEdit;
    console.log('isEdit---------------',isEdit)
    if (isEdit == null || isEdit == undefined || isEdit == '') {
      var title = that.data.title;
      var content = that.data.content;
      var staffId = app.staffId;
      console.log('第一次',title, content, staffId, path)
      if (title == '' || title == null || title == undefined) {
        wx.showModal({
          title: '提示',
          content: '标题不能为空',
          showCancel: false
        });
      } else if (path == undefined || path.length == 0) {
        if (listId == undefined) {
          wx.showModal({
            title: '提示',
            content: '请选择图片',
            showCancel: false
          });
        }
      } else if (content == '' || content == null || content == undefined) {
        wx.showModal({
          title: '提示',
          content: '内容不能为空',
          showCancel: false
        });
      } else if (staffId == '' || staffId == null || staffId == undefined) {
        wx.showModal({
          title: '提示',
          content: '无法识别该用户',
          showCancel: false
        });
      } else {
        var param = {
          title: title,
          content: content,
          createUser: staffId,
          token:app.token
        };
        wx.showToast({
            icon: "loading",
            title: "正在上传图片"
          }),
          console.log(path[0])
        wx.uploadFile({
          url: 'https://minipro.arvatocrm.cn/arvato/wxwork/promotion/insert',
          filePath: path[0],
          name: 'file',
          formData: param,
          success: function(res) {
            console.log(res);
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            } else if (res.statusCode = 200) {
              wx.showModal({
                title: '提示',
                content: '上传成功',
                showCancel: false,
                success: function(data) {
                  console.log(data)
                  if (data.confirm == true) {
                    wx.navigateBack({
                      delta:1
                    })
                  }
                }
              })
            }
          },
          fail: function(e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function() {
            wx.hideToast(); //隐藏Toast
          }
        })
      }
    }else{
      var title = that.data.title;
      var content = that.data.content;
      var thisList = that.data.thisList;
      var staffId = app.staffId;
      console.log('第二次',title, content, staffId, path, thisList)
      if (title == '' || title == null || title == undefined){
        title = thisList.title
      }
      if (content == '' || content == null || content == undefined) {
        content = thisList.content
      }
      if (staffId == '' || staffId == null || staffId == undefined) {
        wx.showModal({
          title: '提示',
          content: '无法识别该用户',
          showCancel: false
        });
        return
      }
      if(path!=null&&path!=[]&&path!=undefined){
        var param = {
          title: title,
          content: content,
          updateUser: staffId,
          promotionId: that.data.isEdit,
          token:app.token
        };
        wx.showToast({
          icon: "loading",
          title: "正在上传图片"
        }),
          console.log(path[0])
        wx.uploadFile({
          url: 'https://minipro.arvatocrm.cn/arvato/wxwork/promotion/update',
          filePath: path[0],
          name: 'file',
          formData: param,
          success: function (res) {
            console.log(res);
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            } else if (res.statusCode = 200) {
              wx.showModal({
                title: '提示',
                content: '上传成功',
                showCancel: false,
                success: function (data) {
                  console.log(data)
                  if (data.confirm == true) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            }
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function () {
            wx.hideToast(); //隐藏Toast
          }
        })
      }else{
        var param = {
          title: title,
          content: content,
          updateUser: staffId,
          promotionId: that.data.isEdit,
          token:app.token
        };
        console.log('param',param)
        wx.showToast({
          icon: "loading",
          title: "正在上传图片"
        }),
        wx.request({
          url: 'https://minipro.arvatocrm.cn/arvato/wxwork/promotion/update',
          data: param,
          success: function (res) {
            console.log(res);
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            } else if (res.statusCode = 200) {
              wx.showModal({
                title: '提示',
                content: '上传成功',
                showCancel: false,
                success: function (data) {
                  console.log(data)
                  if (data.confirm == true) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            }
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function () {
            wx.hideToast(); //隐藏Toast
          }
        })
      }
    }
  },

  save: function() {
    var imgs = this.data.imgs;
    this.upload(this, imgs); //上传图片
  }
})