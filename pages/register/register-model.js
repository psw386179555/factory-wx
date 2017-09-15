import { Base } from '../../utils/base.js' ;

class Register extends Base{
  constructor(){
    super();
  }
  save(e,callback){
    var userInfo = e
    var data = {
      sex: userInfo.gender,
      headimg: userInfo.avatarUrl,
      username: userInfo.nickName      
    }
    var params = {
      url:'member/add',
      data:data,
      type:'POST',
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params);
  }

}

export { Register };