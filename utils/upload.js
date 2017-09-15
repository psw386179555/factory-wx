import { Config } from 'config.js';

class Upload {
  constructor() { 
    this.uploadUrl = Config.restUrl + 'image/upload'; 
  };
  /**
   *返回图片id
   *
   */
  uploadImg(temp, callback) {   
    var that = this;
    var items;
    var k=0;
    for (var i = temp.length - 1; i >= 0; i--) {
        that._upload(temp[i].path,(res)=>{
          // console.log(res);
          items = items ? items + ',' + (JSON.parse(res).img_id) : (JSON.parse(res).img_id);
          k++;
          if(k == temp.length){           
            callback && callback(items);
          }
        })       
    }   
    
  }



  _upload(path,sCallback){
    var that = this;
    wx.uploadFile({
      url: that.uploadUrl,
      filePath:path,
      name: 'image',
      success: function (res) {
        sCallback && sCallback(res.data)    
      }
    });
  } 

}
export { Upload };