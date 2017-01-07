$(function () {
    var url = window.apiPoint + 'companies';
    console.log(url);
    var data = {
        page: 0,
        size: 6
    };
    $.ajax({
        url: url,
        type: 'GET',
        // GET请求传递data
        data: data,
        async: true,
        dataType: 'json',
        error: function (data) {
        },
        success: function (data) {
            if (data) {
                console.log(data.companies);
                var tpl = document.getElementById('tpl').innerHTML;
                var html = juicer(tpl, data);
                $('#tContent').html(html);
            }
        },
    });
});