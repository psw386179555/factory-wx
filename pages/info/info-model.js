
import { Base } from '../../utils/base.js';

class Info extends Base {
  constructor() {
    super();
  }

  getList(callback) {
    var params = {
      url: 'notice',
      sCallback: function (res) {        
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export { Info };