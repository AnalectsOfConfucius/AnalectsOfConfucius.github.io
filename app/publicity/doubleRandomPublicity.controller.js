$(function () {
    //退出全屏
    var url = window.apiPoint + 'double-random-results/doubleRandom';
    console.log(url);
    var dataQuery = {
        page: 0,
        size: 1000,
        doubleRandomId: 1
    };
    $.ajax({
        url: url,
        type: 'GET',
        // GET请求传递data
        data: dataQuery,
        async: true,
        dataType: 'json',
        success: function (data, status, xhr) {
            if (data) {
                var result = {};
                result['doubleRandomResults'] = data;
                console.log(data);
                var tpl = [
                    '{@each doubleRandomResults as it,index}',
                    '<tr>',
                    '<td>${it.id}</td>',
                    '<td>${it.companyName}</td>',
                    '<td>${it.companyRegisterId}</td>',
                    '<td>{@if it.doubleRandom.doubleRandomTaskContent != null }${it.doubleRandom.doubleRandomTaskContent}{@/if}</td>',
                    '<td>${it.people}</td>',
                    '<td>${it.doubleRandom.doubleRandomDate}</td>',
                    '<td>{@if it.result != null }${it.result}{@/if}责令查改</td>',
                    '<td>{@if it.resultDeal != null }${it.result}{@/if}已整改</td>',
                    '<td>{@if it.resultStatus != null }${it.result}{@/if}正常</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#tContent').html(html);
            }
        },
    });
});
