$(function () {
  //获取id
  var id = Tools.getParam("productId");
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    success: function (data) {
      console.log(data);
      $('.mui-scroll').html(template("tpl", data));

      //重新初始化轮播图
      mui(".mui-slider").slider({
        interval: 1000
      });

      //尺码选择
      $('.lt-pro-size').on('click','span',function(){
         $(this).addClass("now").siblings().removeClass("now");
      })

       //重新初始化数字输入框
       mui(".mui-numbox").numbox();
    }
  })

})