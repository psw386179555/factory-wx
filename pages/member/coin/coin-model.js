import { Base } from '../../../utils/base.js';
class Coin extends Base {
  constructor() {
    super();
  }
  getCoin(callback){
    let params = {
      url:'company',
      sCallback:callback,
    }
    this.request(params);
  }
}

export { Coin };