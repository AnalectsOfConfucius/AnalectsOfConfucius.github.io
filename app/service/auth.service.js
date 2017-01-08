$(function () {
    $('.login-action').click(function () {
        localStorage.removeItem('token');
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
            success: function (data) {
                if (data) {
                    var token = 'Bearer ' + data.jwt.id_token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', data.user);
                    if (data.authorityForAdmin) {
                        localStorage.setItem('authorityForAdmin', data.authorityForAdmin);
                        location.href = "/app/main/backend.html";
                        return;
                    } else {
                        location.href = "/app/main/frontend.html";
                        return;
                    }
                }
            },
        });
    });

    $('.logout-action').click(function () {
        localStorage.removeItem('token');
        location.href = "/";
    });
});