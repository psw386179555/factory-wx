
import { Base } from '../../../utils/base.js';

class Verify extends Base {
  constructor() {
    super();
  };

  getVerifyInfo(callback) {
    var params = {
      url: 'member/verify/info',
      type: 'post',
      sCallback: function (res) {
        // console.log(res);
        callback && callback(res)
      }
    }
    this.request(params);
  }

  giveVerify(data,callback){
    var params ={     
        url: 'member/verify',
        data: data,
        type: 'POST',
        sCallback:callback      
    }
    this.request(params);
  }



}

export { Verify };