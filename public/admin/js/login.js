$(function(){
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
       //校验用户名,对应name表单的name属性
       username:{
           validators:{
               notEmpty:{
                   message:'用户名不能为空'
               },
               callback:{
                   message:'用户名错误'
               }
           }
       },
        //校验密码,对应name表单的name属性
       password:{
           validators:{
               notEmpty:{
                   message:'密码不能为空'
               },
               stringLength:{
                   min:6,
                   max:12,
                   message:'密码长度必须在6-12之间'
               },
               callback:{
                message:'密码错误'
            }
           }
       }
   }
})


// 2.注册表单验证成功事件
$form.on('success.form.bv',function(e){
    //默认阻止浏览器跳转
    e.preventDefault();

    //使用ajax提交逻辑请求
    $.ajax({
        type:'POST',
        url:'/employee/employeeLogin',
        dataType:'json',
        data:$form.serialize(),
        success:function(data){
            // console.log(data);
            if(data.success){
                location.href = 'index.html';
            }
            if(data.error === 1000){
                //用户名不存在
                $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                
            }else if(data.error === 1001){
                //密码错误
                $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
            }
        }
    }) 
})

//3.重置功能

$("[type='reset']").on('click',function(){
    $form.data('bootstrapValidator').resetForm();   
})
})
