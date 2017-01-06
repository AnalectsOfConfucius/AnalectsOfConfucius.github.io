function login() {
    var username = $(".m-t").find("input[name='username']").val();
    var password = $(".m-t").find("input[name='password']").val();
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
        error: function(data) {
            if (data.status == 401) {
                alert('账号、密码不匹配');
            } else if (data.status == 400) {
                // Bad Request
                alert('账号、密码格式不对');
            } else {
                alert('登陆失败');
            }
        },
        success: function(data) {
            if (data.id_token) {
                var token = 'Bearer ' + data.id_token;
                localStorage.setItem('token', token);
                location.href = "/index.html";
            }
        },
    });
}

function logout() {
    localStorage.removeItem('token');
    location.href = "/app/auth/login.html";
}