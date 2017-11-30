$(function () {
  var currentPage = 1;
  var pageSize = 5;

  rander();

  function rander() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        //模板与数据结合
        var html = template("second-tpl", data);
        //渲染
        $('tbody').html(html);


        //渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / pageSize),
          onPageClicked: function (a, b, c, p) {
            currentPage = p;
            rander();
          }
        });
      }
    })
  }

  // 点击添加按钮，出来模态框
  $('.add-cate').on('click', function () {
    $('#add-modal').modal("show");
    //模态框中下拉列表(一级菜单的数据)
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        console.log(data);
        var html = template("list-tpl",data);
        $('.dropdown-menu').html(html);
      }

    })
  });

  //给下拉框中所有的a注册点击事件(委托事件)
  $('.dropdown-menu').on('click','a',function(){
    // console.log("kakak");
    // console.log($(this).text());
    //a标签的值付给button
     $('.dropdown-text').text($(this).text());

     //当前a的id值设置给categoryId
     $("[name='categoryId']").val($(this).data("id"));

       //3. 让categoryId校验变成成功
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })



  //
  // 初始化图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      // console.log(data);
      $('.img_box img').attr("src",data.result.picAddr);
      //把图片的地址赋值给brandLogo
      $("[name='brandLogo']").val(data.result.picAddr);

        //把brandLogo改成成功
        $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");

    }
  });

  //表单校验功能
  var $form = $("form");
  $form.bootstrapValidator({
    excluded: [],//不校验的内容
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌图片"
          }
        }
      }
    }
  });



  //添加功能
  $form.on('success.form.bv',function(e){
    e.preventDefault();
    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$form.serialize(),
      success:function(data){
        console.log(data);
        if(data.success){
          $('#add-modal').modal("hide");
          currentPage=1;
          rander();
          
          //初始化样式
            //3. 重置内容和样式
            $form[0].reset();
            $form.data("bootstrapValidator").resetForm();
  
            //4. 重置下拉框组件和图片
            $(".dropdown-text").text("请选择一级分类");
            $("[name='categoryId']").val('');
            $(".img_box img").attr("src", "images/none.png");
            $("[name='brandLogo']").val('');

        }
      }
    })
  })
  





})