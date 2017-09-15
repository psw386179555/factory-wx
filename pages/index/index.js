// pages/index/index.js
import { Index } from 'index-model.js';
var index = new Index();
var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList:[],
    img_data: [],
    is_dots: false,
    swiperCurrent: 0,

    // tabs: ["资讯", "案例", "产品"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // news: [],
    // cases: [],
    // products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // // 获取tab条的效果  
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
    //       sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
    //     });
    //   }
    // });

   
    // 请求banner数据
    index.getBanner((res)=>{
      that.setData({
        img_data: res.item      
      })
    })  

    // 请求list数据
    // index.getList((res)=>{
    //   that.setData({
    //     news: res.news,
    //     cases: res.cases,
    //     products: res.products       
    //   })
    // }) 

    // var that = this;
    index.getListNotice((res) => {
      that.setData({
        noticeList: res,
      })
    }) 
  },
  inCoin: function () {
    index.checkLogin((res) => {
      console.log(res)
      if (res) {
        wx.navigateTo({
          url: '../register/register'
        })
      } else {
        wx.navigateTo({
          url: '../member/coin/coin'
        })
      }
    })
  },
  inApply: function () {
    index.checkLogin((res) => {
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

  swiperChange: function (e) {
    this.setData({ swiperCurrent: e.detail.current });
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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