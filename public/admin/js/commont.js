
// 进度条
    //关闭进度环
    // NProgress.configure({
    //     showSpinner:false
    // })
    // $(document).ajaxStart(function(){
    //    NProgress.start();
    // }).ajaxStop(function(){
    //  setTimeout(function(){
    //     NProgress.done();
    //  },500);
    // });


    // 二级菜单的显示与隐藏
    // 通过切换类now
   $(function(){
     $('.child').prev().on('click',function(){
        // console.log("jejej");
        $(this).next().slideToggle();
     })
}); 


//侧边栏滑动效果
//需求：点击左边的图标；侧边栏滑出左边屏幕
    //   思路：1.css样式
                //   在lt_aside中增加属性left:0;过渡属性
                     //添加一个now类left:-180px;
                //在lt_main增加过渡属性
                     //添加一个now类padding-left:0px;    
$(function(){
    $('.icon-left').on('click',function(){
        // console.log("lala");
        $('.lt_aside').toggleClass("now");
        $('.lt_main').toggleClass("now");
    })
})


// 退出功能
$(function(){
  $('.icon-logout').on('click',function(){
    //   console.log("jejeje");
    $('#logout-modal').modal("show");
    //点击退出按钮,用户退出
    //off()解绑所有事件
    $('.btn-logout').off().on('click',function(){
        // console.log("kakak");
        //发送ajax请求
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success:function(data){
                if(data.success){
                    location.href = "login.html";
                }           
            }
        })
    })
  }) 
});







    
   



