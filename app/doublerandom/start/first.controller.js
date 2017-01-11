$(function () {
    $('.input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });
    $.ajax({
        url: window.apiPoint + 'tasks/all',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                var result = {};
                result["its"] = data;
                var tpl = [
                    '<option value=""></option>',
                    '{@each its as it,index}',
                    '<option value="${it.id}">${it.taskName}</option>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                console.log(html);
                $('#tContent').html(html);
            }
        },
    });
    $('.chosen-select').chosen({});
});