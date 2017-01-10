$(function () {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
    $('.deal').bind('change', function () {
        var deal = $('.deal').val();
        if (deal == 1) {
            $('#myModal1').modal({backdrop: 'static', keyboard: false, show: 'toggle'});
        } else if (deal == 2) {
            $('#myModal2').modal({backdrop: 'static', keyboard: false, show: 'toggle'});
        } else if (deal == 3) {
            $('#myModal3').modal({backdrop: 'static', keyboard: false, show: 'toggle'});
        }
    });
});