// pages/member/coin/coin.js
import { Coin } from 'coin-model.js';

var coin = new Coin();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    var that =this;
    coin.getCoin((res)=>{
      that.setData({
        company: res
      })
    })     
  },
  inAddCo:function(){
    if (wx.getStorageSync('userInfo').status != 2) {
      wx.showModal({
        title: '提示',
        content: '认证后才可入驻',
        confirmText: '去认证',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({              
              url: '../member'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../addco/addco',
      })
    }
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