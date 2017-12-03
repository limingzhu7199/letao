$(function () {

  //1. 获取到地址栏的参数，把key放到input框里面
  //2. 发送ajax请求，获取关键字对应的商品， 结合模版引擎渲染出来
  //3. 点击搜索按钮，再次发送ajax请求，获取关键字对应的商品，结合模版引擎渲染出来。
  //4. 排序功能，点击价格进行排序，多传一个排序的参数，获取到对应的商品，结合模版引擎渲染出来

  //准备好参数，发送ajax请求，获得结果，渲染页面
  function render() {
    var param = {};
    param.page = 1;
    param.pageSize = 100;
    param.proName = $('.search').val().trim();

    //考虑排序，如果a下有now，则需要排序
    //获取选中的a
    var $now = $('.lt-sort a.now');
    if ($now.length == 1) {
      //需要排序
      var type = $now.data("type");

      //根据箭头的方向排序
      var value = $now.find("span").hasClass("fa-angle-down") ? 2 : 1;
      param[type] = value;

    }

    //发送数据之前加载数据
    $('.lt-product').html('<div class="loading"></div>');
    //  发送ajax请求，获取数据
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success: function (data) {
        // console.log(data);
        setTimeout(function () {
          //渲染
          $('.lt-product').html(template("tpl", data));
        }, 1000);
      }
    });
  }



  //获取地址栏中key的值
  var key = Tools.getParam("key");
  $('.search').val(key);
  //  发送ajax请求，获取数据
  // $.ajax({
  //   type:'get',
  //   url:'/product/queryProduct',
  //   data:{
  //     proName:key,
  //     page:1,
  //     pageSize:100
  //   },
  //   success:function(data){
  //     console.log(data);
  //      //渲染
  //     $('.lt-product').html(template("tpl",data));
  //   }
  // })


  render();


  //点击按钮注册事件，重新获取关键字 发送ajax请求，渲染页面
  $('.search_btn').on("click", function () {
    render();
  })



  //给所有的a注册点击事件
  $(".lt-sort a[data-type]").on("click", function () {
    var $this = $(this);
    console.log($this);
    //如果有now,改变箭头方向
    if ($this.hasClass("now")) {
      //改变箭头方向
      $(this).find("span").toggleClass('fa-angle-down').toggleClass("fa-angle-up");
    } else {
      //给a添加now类
      $(this).addClass("now").siblings().removeClass("now");
      $(".lt_sort span").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
    render();


  })



})