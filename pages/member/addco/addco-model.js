
import { Base } from '../../../utils/base.js';
import { Upload } from '../../../utils/upload.js';

class AddCo extends Base {
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

  addCompany(logo, photos, data, callback) {
    var _upload = new Upload();
    _upload.uploadImg(logo, (res) => {
      data['logo'] = res
      _upload.uploadImg(photos, (res) => {
        data['photos'] = res
        // console.log(data);
        var params = {
          url: 'company/add?XDEBUG_SESSION_START=17811',
          data: data,
          type: 'post',
          sCallback: callback
        }
        this.request(params);
      }); 
    });
   
    
    
  }
}

export { AddCo };