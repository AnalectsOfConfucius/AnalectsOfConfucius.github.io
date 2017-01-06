$(function () {
    var url = window.apiPoint + 'companies';
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        // 序列化Json对象为Json字符串
        async: true,
        dataType: 'json',
        error: function (data) {
        },
        success: function (data) {
            if (data) {
                console.log(data.companies);
                var tpl = document.getElementById('tpl').innerHTML;
                var html = juicer(tpl, data);
                $("#tContent").html(html);
            }
        },
    });
});