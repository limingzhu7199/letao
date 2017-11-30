$(function(){
  // 1.在页面引入模板3.创建模板5.修改模板
  // 2.发送ajax获得数据4.获取数据,结合,渲染
  var currentPage = 1;
  var pageSize = 5;

  //页面一进来就进行渲染
  rander();
 function rander(){
  $.ajax({
    type:'get',
    url:'/user/queryUser',
    data:{
       page:currentPage,
       pageSize:pageSize
    },
    success:function(data){
      // console.log(data);
      //请求成功,获得数据,模板与数据结合
      var html = template("user-modal",data);
      //渲染页面
      $('tbody').html(html);

      //分页

      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:currentPage,
        totalPages:Math.ceil(data.total/data.size),
        onPageClicked:function(a,b,c,page){
          currentPage=page;
          //重新渲染页面
          rander();
        }
      });
    
    }
  });
 }

//  启用/禁用功能
// 给表格中的所有按钮注册点击事件(因为是渲染出来的，委托事件)
$('tbody').on("click",'.btn',function(){
  //出来模态框
  $('#startEnd-modal').modal("show");
   

  // 获取到对应的id,状态
  var id = $(this).parent().data('id');
  // console.log(id);
  var isDelete = $(this).hasClass('btn-danger')?0:1;
  // console.log(isDelete);
  // 发送ajax请求
  // 给模态框的确定按钮注册点击事件
  $('.btn-sure').on('click',function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(data){
        //如果成功，模态框隐藏，重新渲染页面
        if(data.success){
          $('#startEnd-modal').modal("hide");
          rander();
        }
  
      }
  
    })
  })
  



})

  

})