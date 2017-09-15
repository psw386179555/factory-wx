// pages/member/relate/message/message.js
import { Message } from 'message-model.js';
var message = new Message();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     btnDisabled:false,
      activeIndex: 0,
      imageCount:5,
      imageList:[],
     radioList: [
      {
        text: '机械加工'
      },
      {
        text: '科研转化'
      },
      {
        text: '用户体验'
      },
      {
        text: '系统漏洞'
      }
    ]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  radioChange: function (e) {
    // console.log(e);
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    });
  },

  chooseImage: function () {
    var that = this
    var count = that.data.imageCount - that.data.imageList.length;
    if (that.data.imageList.length >= 5) {
          wx.showToast({
            title: '图片不多于5张',
            icon: 'success',
            image: '/image/jinggao.png',
            duration: 2000
          })
          return false;
        }  
    wx.chooseImage({
      count:count,    
      success: function (res) {
        // console.log(res)
        var oldImageList=that.data.imageList;        
        var imageList=oldImageList.concat(res.tempFiles)
        // console.log(imageList);
        that.setData({
          imageList: imageList         
        })
      }
    })
  },

  previewImage: function (e) {
    var that=this
    var current = e.target.dataset.src
    var imageListUrl=[];
    for (var i = that.data.imageList.length - 1; i >= 0; i--) {
        imageListUrl[i]=that.data.imageList[i]['path']
    }
    wx.previewImage({
      current: current,
      urls: imageListUrl
    })
  },

  deleteImage:function(){
    var  that=this
    var imageList=that.data.imageList;
    var length=imageList.length-1;
    var newImageList=imageList.slice(0,length);
    that.setData({
      imageList:newImageList     
    })


  },

  formSubmit(e){
    var that =this;
    var temp = that.data.imageList;
    var value = e.detail.value;
    // console.log(e);
    value['type'] = that.data.activeIndex;
    value['formID'] = e.detail.formId
    wx.showLoading({
      title: '提交中',
    })
    message.addMessage(temp,value,(res)=>{
      if(res){       
        that.setData({
          btnDisabled:true
        })
        wx.showToast({
          title: '感谢反馈！',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.switchTab({
            url: '../../../../pages/index/index'
          })
        },2000) 
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