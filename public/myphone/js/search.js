$(function () {
  //得到历史记录，转化成数组
  function getHistory() {
    //得到历史记录
    var history = localStorage.getItem("history") || '[]';
    // 转化成数组
    var arr = JSON.parse(history);
    // 返回数组
    return arr;
  }

  //渲染功能
  function render() {
    //得到历史记录
    var arr = getHistory();
    //console.log(arr);
    //渲染
    $('.lt-history').html(template("tpl", {
      list: arr
    }));
  }
  render();


  //单个点击删除逻辑
  //1.注册点击事件
  //2.获取到对应的id值
  //3.获得本地缓存，得到数组
  //4.删除
  //5.重新设置缓存
  //6.重新渲染
  $('.lt-history').on('click', '.btn_delete', function () {
    //获取对应的自定义属性index的值
    var index = $(this).data("index")
    //得到本地历史的数组
    var arr = getHistory();
    //删除数组中对应的纪录
    arr.splice(index, 1);
    //重新设置缓存
    localStorage.setItem("history", JSON.stringify(arr));
    render();
  });

  //清空全部记录
  $('.lt-history').on('click', '.btn_empty', function () {

    mui.confirm("确定清空历史记录", "温馨提示", ["确定", "取消"], function (e) {

      // console.log(e);
      if (e.index == 0) {
        var arr = getHistory();
        //  数组全部删除
        arr = [];
        // 重置缓存
        localStorage.setItem("history", JSON.stringify(arr));
        //重新渲染
        render();
      }

    })

  })


  //添加的逻辑
  //1. 注册点击事件
  //2. 获取到输入的关键字
  //3. 获取本地缓存，得到数组
  //4. 把关键字添加到数组的最前面
  //5. 重新设置缓存
  //6. 重新渲染

  $('.search_btn').on('click', function () {
    // 得到文本内容
    var key = $('.search').val().trim();
    //  清空文本内容
    $('.search').val("");

    //如果没有输入内容，给一个提示"请输入搜索关键字"
    if (key === "") {
      mui.toast("请输入关键字");
      return false;
    }

    //得到本地历史记录
    var arr = getHistory();
    // console.log(arr);
    //如果输入相同的选项，则干掉原来的项，把新的渲染到第一项
    //得到key在数组中的下标
    var index = arr.indexOf(key);
    if (index != -1) {
      //说明存在,则删除
      arr.splice(index, 1);
    }

    //最多只能添加10条记录,再添加则删除最后一条记录
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("history", JSON.stringify(arr));
    render();

    //页面跳转到搜索列表页
    location.href = "productList.html?key="+key;
  })

})