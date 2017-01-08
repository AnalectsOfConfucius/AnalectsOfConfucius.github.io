$(function () {
    if (localStorage.getItem('token')) {
        var yellow = 10;
        var red = 100;
        if (red > 0 || yellow > 0) {
            swal({
                title: "请注意，您已被红黄牌警告！",
                text: "你已收到红牌" + red + "张，收到黄牌" + yellow + "张。",
                type: "warning",
            });
        }
    }
});