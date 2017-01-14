$(function () {
    initPage(0, 10);
});

function initPage(page, size) {
    var url = window.apiPoint + 'double-random-results/login/finished';
    console.log(url);
    var dataQuery = {
        page: page,
        size: size,
        check: 'checked'
    };
    $.ajax({
        url: url,
        type: 'GET',
        // GET请求传递data
        data: dataQuery,
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                var result = {};
                result['doubleRandomResults'] = data;
                console.log(data);
                var tpl = [
                    '{@each doubleRandomResults as it,index}',
                    '<tr>',
                    '<td>${it.id}</td>',
                    '<td>${it.companyName}</td>',
                    '<td>${it.companyRegisterId}</td>',
                    '<td>${it.department}</td>',
                    '<td>${it.people}</td>',
                    '<td>${it.doubleRandom.doubleRandomTaskContent}</td>', ,
                    '<td>${it.doubleRandom.doubleRandomDate}</td>',
                    '<td>{@if it.result != null}${it.result}{@/if}</td>',
                    '<td>',
                    '{@if it.finishDate == null}',
                    '{@if it.sign != null}',
                    '<span class="label label-${it.sign.signCss}">${it.sign.signName}</span>',
                    '{@else}',
                    '<span class="label label-info">计划中</span>',
                    '{@/if}',
                    '{@else}',
                    '<span class="label label-success">已完成</span>',
                    '{@/if}',
                    '</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#tContent').html(html);
            }
        },
    });
};