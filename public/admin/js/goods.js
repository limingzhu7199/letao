$(function () {
  var page = 1;
  var pageSize = 5;
  var imgs = [];
  rander();

  function rander() {
    //  发送ajax请求
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        $('tbody').html(template("goods-tpl", data));


        //渲染非页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: page, //当前页
          totalPages: Math.ceil(data.total / data.size), //总页数
          itemTexts: function (type, page, current) {
            // console.log(type,page,current);
            switch (type) {
              case "page":
                return page;
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
            }
          },
          onPageClicked: function (a, b, c, p) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            page = p;
            rander();
          }
        })
      }
    })
  }

  //点击添加商品，显示模态框
  $('.add-goods').on('click', function () {
    // console.log("jsjjs");
    $('#add-modal').modal("show");
    //模态框中下拉列表(二级级菜单的数据)
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        // console.log(data);
        $('.dropdown-menu').html(template("list-tpl", data));

      }
    })



  });

  //给下拉框中所有的a注册点击事件(委托事件)
  $('.dropdown-menu').on('click', 'a', function () {
    $('.dropdown-text').text($(this).text());
    //存储id
    $("[name='brandId']").val($(this).data("id"));
    //手动校验成功
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");

  });


  //表单校验
  //使用表单校验插件
  var $form = $('form');
  $form.bootstrapValidator({
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品名不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '库存不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '第一个数为非零'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '尺码不能为空'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '格式类似32-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "旧价格不能为空"
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '价格不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传三种图片'
          }
        }
      }
    }
  });

// 上传图片处理
$("#fileupload").fileupload({
  dataType: "json",
  //e：事件对象
  //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
  done: function (e, data) {
    // console.log(data);
    if (imgs.length >= 3) {
      return false;
    }
    // 动态的往img_box里添加图片
    $('.img_box').append('<img src=' + data.result.picAddr + ' width="100" height="100" alt="">');
    //把返回的结果存起来
    imgs.push(data.result);
    // console.log(imgs);
    // //3. 判断数组的长度，如果是3，手动让brandLogo 校验成功即可，  如果不是3，校验失败
     if (imgs.length === 3) {
     $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    } else {
      $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
   }

  }
});

//表单校验成功
$form.on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  var param = $form.serialize();
  param += "&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
  param += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
  param += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
  // console.log(param);
  //发送ajax请求
  $.ajax({
    type:'post',
    url:'/product/addProduct',
    data:param,
    success:function(data){
      //模态框消失
      //  console.log(data);
      $('#add-modal').modal("hide");
      // 重新渲染页面
      page =1;
      rander();


      //重置表单校验
      $form.data('bootstrapValidator').resetForm();
      //下拉框恢复
      $('.dropdown-text').text("请选择二级分类");
      //重置隐藏框的值
      $("[type='hidden']").val('');
      $form[0].reset();
      $('.img_box img').remove();
    }
  })

});









});

