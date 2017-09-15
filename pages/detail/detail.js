// pages/detail/detail.js
import { Detail } from 'detail-model.js';
var WxParse = require('../../wxParse/wxParse.js');
var detail = new Detail();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    detailData:{}    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;    
    detail.showDetail(options['id'],(res)=>{
      that.setData({
        detailData: {
          title: res.title,
          create_time: res.create_time,
          author: res.author,
          sum: res.sum
        }
      });
      WxParse.wxParse('article', 'html', res['content'], that, 3);
      setTimeout(function () {
        that.setData({
          hidden: false
        })
      }, 500);
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