
import { Base } from '../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }

  getBanner(callback) {
    var params = {
      url: 'banner',    
      sCallback: function (res) {
        // console.log(res);
        callback && callback(res);
      }
    }
    this.request(params);
  }

  getListNotice(callback) {
    var params = {
      url: 'notice',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  getList(callback) {
    var params = {
      url: 'article',
      sCallback: function (res) {
        // console.log(res);
        // console.log(res);
        var news = [];
        var cases = [];
        var products = [];
        for (var i = res.length - 1; i >= 0; i--) {
          // console.log(res[i]['type']);
          // console.log(res[i]);
          switch (res[i]['type']) {
            case 0:
              news.push(res[i]);
              break;
            case 1:
              cases.push(res[i]);
              break;
            case 2:
              products.push(res[i]);
            default:

          }
        }
        res = {
          'news': news,
          'cases': cases,
          'products': products
        }  
        callback && callback(res);
      }
    }
    this.request(params);
  }

  checkLogin(callback) {
    var status = wx.getStorageSync('userInfo').status;
    if (!status || status < 1) {
      wx.showModal({
        content: '请先登录！',
        confirmText: '去登录',
        success: function (res) {
          if (res.confirm) {
            callback && callback(res.confirm)
          }
        }
      })
    } else {
      callback && callback(false)
    }
  }
}

export { Index };