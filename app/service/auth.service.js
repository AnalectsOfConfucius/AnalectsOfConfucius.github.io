/*
 function logout() {
 localStorage.removeItem('token');
 location.href = "/index.html";
 }*/
$(function () {
    $('.login-action').click(function () {
        var username = $("#ff").find("input[name=username]").val();
        var password = $("#ff").find("input[name=password]").val();
        var rememberMe = false;
        var url = window.apiPoint + 'authenticate';
        console.log(url);
        // 组建Json对象
        var data = {
            username: username,
            password: password,
            rememberMe: rememberMe
        };
        $.ajax({
            url: url,
            type: 'POST',
            // 序列化Json对象为Json字符串
            data: JSON.stringify(data),
            async: false,
            dataType: 'json',
            error: function (data) {
                if (data.status == 401) {
                    alert('账号、密码不匹配');
                } else if (data.status == 400) {
                    // Bad Request
                    alert('账号、密码格式不对');
                } else {
                    alert('登陆失败');
                }
            },
            success: function (data) {
                if (data.id_token) {
                    var token = 'Bearer ' + data.id_token;
                    localStorage.setItem('token', token);
                    location.href = "/app/main/backend.html";
                    window.event.returnValue = false;
                }
            },
        });
        /*localStorage.setItem('token', 'token');
         console.log(localStorage.getItem('token'));
         $('#modal-login').modal('toggle');
         var yellow = 10;
         var red = 100;
         if (red > 0 || yellow > 0) {
         swal({
         title: "请注意，您已被红黄牌警告！",
         text: "你已收到红牌警告" + red + "张，收到黄牌预警" + yellow + "张。",
         type: "warning",
         });
         }*/
    });

    $('.logout-action').click(function () {
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        loginFilter();
    });
});