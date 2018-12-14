// pages/wxwork/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverShow: 0,
    historyOrderShow:0,
    coverContentShow:0,
    previewContentShow: 0,
    listShow: 1,
    editShow: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  showHistory:function(){
    this.setData({
      coverShow:1,
      historyOrderShow:1
    })
  },

  historyHide:function(){
    this.setData({
      coverShow: 0,
      historyOrderShow: 0
    })
  },

  showEdit:function(){
    this.setData({
      coverShow: 1,
      coverContentShow: 1
    })
  },

  hideEdit: function () {
    this.setData({
      coverShow: 0,
      coverContentShow: 0
    })
  },

  showPreview: function(){
    this.setData({
      coverShow: 1,
      previewContentShow: 1,
      coverContentShow: 0
    })
  },

  hidePreview: function () {
    this.setData({
      coverShow: 0,
      previewContentShow: 0
    })
  },

  showDetail:function(){
    this.setData({
      listShow: 0,
      editShow:1
    })
  },

  hideDetail: function () {
    this.setData({
      listShow: 1,
      editShow: 0
    })
  },
})