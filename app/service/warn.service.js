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
                        text: "你有" + data['红牌'] + "受到红牌警告，有" + data['黄牌'] + "个任务受到黄牌警告！",
                        type: "warning",
                    });
                }
            }
        });
    }
});