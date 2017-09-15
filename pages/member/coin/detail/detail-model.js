
import { Base } from '../../../../utils/base.js';

class Detail extends Base {
  constructor() {
    super();
  }
  showDetail(id,callback){
    let params = {
      url:'company/show/'+id,
      sCallback:callback
    }
    this.request(params);
  }
}
export { Detail };