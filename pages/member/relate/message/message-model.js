import { Base } from '../../../../utils/base.js';
import { Upload } from '../../../../utils/upload.js';

class Message extends Base{
  constructor(){
    super();
  }

  addMessage(temp,data,callback){
   var that = this;
    var upload = new Upload();
    upload.uploadImg(temp,(res)=>{
      data['photos'] = res;
      var params = {
        url: 'feedback/add?XDEBUG_SESSION_START=16557',
        data: data,
        type: 'post',
        sCallback: callback
      }
      that.request(params);
    })
  }

 
}



export { Message } ;