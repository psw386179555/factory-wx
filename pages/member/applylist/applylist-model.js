
import { Base } from '../../../utils/base.js';

class ApplyList extends Base {
  constructor() {
    super();
  };

  getList(callback){
    var params = {
      url:'apply/member',
      sCallback:function(res){
        // console.log(res);
        callback && callback(res)
      }
    }
    this.request(params);    
  }
}

export { ApplyList };