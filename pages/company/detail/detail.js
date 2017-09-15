// pages/company/detail/detail.js
import { Detail } from 'detail-model.js';
var detail = new Detail();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that =this;
    if (options['id']) {
      detail.showDetail(options['id'],(res)=>{
        that.setData({
          company: res
        })  
      })              
    }
  },

  previewLogoImage: function (e) {
        var that = this
        var current = e.target.dataset.src
        var imageListUrl = [];
        imageListUrl.push(current);
        wx.previewImage({
            current: current,
            urls: imageListUrl
        })
    },
    previewImage: function (e) {
        var that = this
        var current = e.target.dataset.src
        var imageListUrl = [];
        var urls=that.data.company.item;
        for (var i =0; i <= urls.length - 1; i++) {
          let url = urls[i].img.img_url;
            imageListUrl.push(url);
        }

        wx.previewImage({
            current: current,
            urls: imageListUrl
        })
    },

    openLocation:function(){
      var that =this;
        wx.openLocation({
          latitude:that.data.company.latitude,
          longitude:that.data.company.longitude,
          success: function(res) { }
        })
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})