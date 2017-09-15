
import { Base } from '../../utils/base.js';

class Company extends Base {
  constructor() {
    super();
  }

  showCompany(callback){
    let params = {
      url: 'company/verified',
      sCallback: callback
    }
    this.request(params);
  }
}
export { Company };