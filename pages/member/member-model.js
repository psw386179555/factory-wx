
import { Base } from '../../utils/base.js';

class Member extends Base{
  constructor(){
    super();
  }

  getMemberInfo(callback){
  	var params ={
  		url: 'member/verify/info',
  		type:'POST',
  		sCallback:function(res){
  			// console.log(res);
        	callback && callback(res);        	       
      }	
  	}
  	this.request(params);
  }

  checkLogin(callback){    
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
    }else{
      callback && callback(false)
    }
  }
}

export { Member };