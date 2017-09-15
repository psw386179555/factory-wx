// pages/member/addco/addco.js
import { AddCo } from 'addco-model.js';
var addCo = new AddCo();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnDisabled:false,
    imageLogo: [],
    imageList: [],
    imageCount: 9,
    company: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  chooseLogoImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          imageLogo: res.tempFiles,
        })
      }
    })
  },

  previewLogoImage: function (e) {
    var that = this
    var current = e.target.dataset.src
    var imageListUrl = [];
    for (var i = that.data.imageLogo.length - 1; i >= 0; i--) {
      imageListUrl[i] = that.data.imageLogo[i]['path']
    }
    wx.previewImage({
      current: current,
      urls: imageListUrl
    })
  },

  deleteLogoImage: function () {
    var that = this
    var imageList = that.data.imageLogo;
    var length = imageList.length - 1;
    var newImageList = imageList.slice(0, length);
    that.setData({
      imageLogo: newImageList
    })
  },


  chooseImage: function () {
    var that = this
    var count = that.data.imageCount;
    if (that.data.imageList.length >= 9) {
      wx.showToast({
        title: '不多于9张',
        icon: 'success',
        image: '/image/jinggao.png',
        duration: 2000
      })
      return false;
    }
    wx.chooseImage({
      count: count,
      success: function (res) {
        console.log(res)
        var oldImageList = that.data.imageList;
        var imageList = oldImageList.concat(res.tempFiles);

        // console.log(imageList);
        that.setData({
          imageList: imageList,
          imageCount: 9 - imageList.length
        })
      }
    })
  },

  previewImage: function (e) {
    var that = this
    var current = e.target.dataset.src
    var imageListUrl = [];
    for (var i = that.data.imageList.length - 1; i >= 0; i--) {
      imageListUrl[i] = that.data.imageList[i]['path']
    }
    wx.previewImage({
      current: current,
      urls: imageListUrl
    })
  },

  deleteImage: function () {
    var that = this
    var imageList = that.data.imageList;
    var length = imageList.length - 1;
    var newImageList = imageList.slice(0, length);
    that.setData({
      imageList: newImageList
    })


  },

  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          company: {
            addressName: res.name,
            address: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          }
        })
      }
    })
  },

  formSubmit: function (e) {
    var that = this;
    var data = e.detail.value;
    var logo = that.data.imageLogo;
    var list = that.data.imageList;
    if (data.name == '' &&
      data.service == '' &&
      data.address == '' &&
      data.service_time == '' &&
      data.phone == '') {
      wx.showToast({
        title: '请填写各项！',
        image: '/image/jinggao.png',
        duration: 2000
      })
      return false;
    }


    if (list.length == 0) {
      wx.showToast({
        title: '请上传图片！',
        image: '/image/jinggao.png',
        duration: 2000
      })
      return false;
    }


    if (logo.length == 0) {
      wx.showToast({
        title: '请上传LOGO！',
        image: '/image/jinggao.png',
        duration: 2000
      })
      return false;
    }
    wx.showLoading({
      title: '正在提交',
    });
    that.setData({
      btnDisabled: true,
    })
    addCo.addCompany(logo,list,data,(res)=>{
        if(res){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../../../pages/member/member'
            })
          },2000)
        }else{
          wx.showToast({
            title: '失败',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            btnDisabled:false,
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