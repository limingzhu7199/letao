mui('.mui-scroll-wrapper').scroll({
  indicators: false, //是否显示滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


//获取地址栏中的参数

// function getParamObj(){
//   //获取参数列表  ?name = lmz&age=18
//   var search = location.search;
//   //对参数进行解码
//   search = decodeURI(search);
//   //把？去掉name = lmz&age=18
//   search = search.slice(1);
//    //&去掉存入数组
//    var arr = search.split("&");
//    //遍历对象,把值存入对象
//    var obj ={};
//    arr.forEach(function(e){
//      var key = e.split("=")[0];
//      var value = e.split("=")[1];
//      obj[key]=value;
//    });
//    return obj;

// }

// //获取指定的参数
// function getParam(key){
//   return getParamObj()[key];
// }


var Tools = {
  getParamObj:function(){
     //获取参数列表  ?name = lmz&age=18
  var search = location.search;
  //对参数进行解码
  search = decodeURI(search);
  //把？去掉name = lmz&age=18
  search = search.slice(1);
   //&去掉存入数组
   var arr = search.split("&");
   //遍历对象,把值存入对象
   var obj ={};
   arr.forEach(function(e){
     var key = e.split("=")[0];
     var value = e.split("=")[1];
     obj[key]=value;
   });
   return obj;
  },
  getParam:function(key){
    return this.getParamObj()[key];
  }
}