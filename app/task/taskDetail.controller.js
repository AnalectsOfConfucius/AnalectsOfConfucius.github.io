$(function () {
    var resultId = getUrlValue("id");
    initPage(resultId);
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

function initPage(id) {
    $.ajax({
        url: window.apiPoint + 'double-random-results/' + id,
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            var result =  {};
            result["doubleRandomResult"] = data;
            var tpl = [
                '<p><span class="font-noraml">企业名称： </span>${doubleRandomResult.companyName}</p>',
                '<p><span class="font-noraml">执法人员： </span>${doubleRandomResult.people}</p>',
                '<p><span class="font-noraml">检查事项： </span>${doubleRandomResult.doubleRandom.doubleRandomTaskContent}</p>',
                '<p><span class="font-noraml">检查时间： </span>${doubleRandomResult.doubleRandom.doubleRandomDate}'
            ].join('');
            var html = juicer(tpl, result);
            $('#tContent').html(html);
            console.log(data);
        }
    });
};