// pages/work/work.js
import { Apply } from 'apply-model.js';
var apply = new Apply();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    imageCount: 9,
    radioItems: [
      { name: '成果转化', value: 0, checked: true },
      { name: '机械加工', value: 1 }
    ],
    radioIndex: 0,
    checkboxItems: [
      { name: '机加工', value: 0 },
      { name: '装配', value: 1 },
      { name: '锻造', value: 2 },
      { name: '表面处理', value: 3 },
      { name: '钣金', value: 4 },
      { name: '焊接', value: 5 },
      { name: '铸造', value: 6 },
      { name: '热处理', value: 7 },
      { name: '模具', value: 8 },
      { name: '塑模', value: 9 },
      { name: '冲压', value: 10 }
    ],


    date: "2017-06-01",

    countries: ["有毛坯", "无毛坯"],

    material: ["不锈钢", "钢", "铝合金", "铝"],

    countryIndex: 0,

    materialIndex: 0,

    isAgree: true
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      radioIndex: e.detail.value
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },

  bindMaterialChange: function (e) {
    this.setData({
      materialIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
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
        // console.log(res)
        var oldImageList = that.data.imageList;
        var imageList = oldImageList.concat(res.tempFiles)
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

  formSubmit: function (e) {
    var that = this;

    if (e.detail.value.leader == '' &&
      e.detail.value.mobile == '' &&
      e.detail.value.project_name == '' &&
      e.detail.value.content == '' &&
      e.detail.value.money == '') {
      wx.showToast({
        title: '请填写各项！',
        image: '/image/jinggao.png',
        duration: 2000
      })
      return false;

    }

    if (that.data.imageList.length == 0) {
      wx.showToast({
        title: '请上传图纸！',
        image: '/image/jinggao.png',
        duration: 2000
      })
      return false;

    }

    var data = e.detail.value;
    data['send_time'] = that.data.date;
    data['type'] = that.data.radioIndex;   
    if (data['type'] == 1) {
      data['rough'] = that.data.countryIndex;
      data['material'] = that.data.materialIndex;
      for (var i = that.data.checkboxItems.length - 1; i >= 0; i--) {
        var obj = that.data.checkboxItems[i];
        
        if (obj.checked) {  
          data['machine_type'] = data['machine_type'] ? data['machine_type'] + ',' + obj.value : obj.value;      
        }
      }

    }

    console.log(data);
    wx.showLoading({
      title: '正在提交',
    });

    apply.addApply(that.data.imageList, data, (res) => {
      if (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.switchTab({
            url: '../member/member'
          })
        },2000)        
      }else{
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
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