// pages/member/verify/verify.js
import { Verify } from 'verify-model.js';

var verify = new Verify();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verify: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    verify.getVerifyInfo((res)=>{
      that.setData({
        verify: res
      })
    })
    
    
  },

  formSubmit: function (e) {
    var that = this;
    var data = e.detail.value;
    data['status'] = 1;
    if (data.name == '' && data.beco == '' && data.phone == '' && data.duty == '') {
      wx.showToast({
        title: '请填写好！',
        image: '/image/jinggao.png',
        duration: 2000
      })
      return false;
    }
    verify.giveVerify(data,(res)=>{
      if (res) {
        wx.switchTab({
          url: '../member'
        })
      }
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