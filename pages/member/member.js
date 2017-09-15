// pages/member/member.js
import { Member } from 'member-model.js';

var member = new Member();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  inGetInfo: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },

  inApply: function () {    
    member.checkLogin((res) => {
      // console.log(res)
      if (res) {
        wx.navigateTo({
          url: '../register/register'
        })
      } else {
        if (wx.getStorageSync('userInfo').status != 2) {
          wx.showModal({
            title: '提示',
            content: '认证后才可申请工单',
            confirmText: '去认证',
            success: function (res) {             
            }
          })
        } else {
          wx.navigateTo({
            url: '../apply/apply'
          })
        }        
      }
    })

  },

  verify: function () {
    member.checkLogin((res) => {
      console.log(res)
      if (res) {
        wx.navigateTo({
          url: '../register/register'
        })
      } else {
        wx.navigateTo({
          url: './verify/verify'
        })
      }
    })
  },

  inApplyList: function () {
    member.checkLogin((res)=>{
      console.log(res)
      if(res){
        wx.navigateTo({
          url: '../register/register'
        })
      }else{
        wx.navigateTo({
          url: './applylist/applylist'
        })
      }     
    })
  },

  inCoin: function () {
    member.checkLogin((res) => {
      console.log(res)
      if (res) {
        wx.navigateTo({
          url: '../register/register'
        })
      } else {
        wx.navigateTo({
          url: './coin/coin'
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
    var that = this;
    member.getMemberInfo((res) => {
      var status =res.status
      var name = res.name
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          res.data['status'] = status;
          res.data['name'] = name;
          wx.setStorageSync('userInfo', res.data)
          that.setData({
            userInfo:res.data
          })
        }
      })       
    });

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
    // this.onLoad();

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