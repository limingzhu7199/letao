$(function(){
  var currentPage = 1;
  var pageSize = 5;


  rander();

function rander(){
    // 发送ajax请求，获得数据
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize: pageSize 
      },
      success:function(data){
        // console.log(data);
        var html = template("first-tpl",data);
        $('tbody').html(html);
  
         //渲染分页
         $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function (a,b,c,p) {
            currentPage = p;
            rander();
          }
        });
      }
    })
}


//点击添加分类，显示模态框
$('.add-cate').on('click',function(){
  $('#add-modal').modal("show");
  })

  //表单校验
  var $form = $('form');
  //  1.  初始化表单校验
  $form.bootstrapValidator({
      //1.指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //  2.指定校验字段 
     fields:{
         categoryName:{
             validators:{
                 notEmpty:{
                     message:'请输入一级分类名称'
                 }
             }
         }      
     }
  })

  // 2.注册表单验证成功事件
  $form.on('success.form.bv',function(e){
    e.preventDefault();
    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$form.serialize(),
      success:function(data){
        // console.log(data);
        //如果成功,关闭模态框,重新渲染第一页
        $('#add-modal').modal("hide");
        currentPage = 1;
        rander();

         //把模态框中的数据重置
         $form.data("bootstrapValidator").resetForm();
         //$form是一个jquery对象，没有reset方法
         //但是dom对象有reset方法，所以需要把form这个对象取出来，才能调用reset方法
         $form[0].reset();
      }

    })
})



})