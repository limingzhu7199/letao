$(function(){
   $.ajax({
     type:'get',
     url:'/category/queryTopCategory',
     success:function(data){
      //  console.log(data);
       $('.first').html(template("tpl",data));

        // 默认渲染二级分类id==0
        randerSec(data.rows[0].id);
       //给所有的li注册事件
      
     }

   });

  //  渲染二级分类，要求一级分类传入id值
  function randerSec(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(data){
      // console.log(data);
      $(".second").html( template("tpl2",data));
      }
    })
  }



  $('.first').on('click','li',function(){
    //  console.log("heheh");
    $(this).addClass("now").siblings().removeClass("now");;
    var id = $(this).data('id');
    randerSec(id);

     //让右边的区域滚动滚回 0，0
     mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);//100毫秒滚动到顶2

   })





})