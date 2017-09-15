import { Base } from '../../utils/base.js';
import { Upload } from '../../utils/upload.js';
class Apply extends Base{
  constructor(){
    super();
  }

  addApply(photos,data,callback){
    var that =this;
    var upload = new Upload();
    upload.uploadImg(photos,(res)=>{
      data['photos'] = res;
      let params ={
        url:'apply/add',
        data:data,
        type:'post',
        sCallback:callback
      }
      that.request(params);
    })
  }

  checkValue(e){
    if (e.detail.value.leader == '' &&
      e.detail.value.mobile == '' &&
      e.detail.value.project_name == '' &&
      e.detail.value.content == '' &&
      e.detail.value.money == '') {
      wx.showToast({
        title: '请填写各项！',
        image: '/image/jinggao.png',
        duration: 2000
      })
      return false;
    }
  }
}
export { Apply };