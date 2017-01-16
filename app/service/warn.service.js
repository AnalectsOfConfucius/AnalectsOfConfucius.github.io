$(function () {
    if (localStorage.getItem('token')) {
        $.ajax({
            url: window.apiPoint + 'double-random-results/count',
            type: 'GET',
            async: true,
            dataType: 'json',
            success: function (data) {
                if (data['红牌'] > 0 || data['黄牌'] > 0) {
                    swal({
                        title: "请注意，您已被红黄牌警告！",
                        text: "你已收到红牌" + data['红牌'] + "张，收到黄牌" + data['黄牌'] + "张。",
                        type: "warning",
                    });
                }
            }
        });
    }
});