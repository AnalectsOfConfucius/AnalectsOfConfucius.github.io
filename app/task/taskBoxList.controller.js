$(function () {
    initPage(0, 10);
});

function initPage(page, size) {
    var url = window.apiPoint + 'double-random-results/login';
    console.log(url);
    var dataQuery = {
        page: page,
        size: size
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
                var tpl = [
                    '{@each doubleRandomResults as it,index}',
                    '<tr class="{@if it.id != 2 }read{@else}unread{@/if}">',
                    '<td class="check-mail">',
                    '{@if it.id == 3 }<span class="label label-warning">黄牌</span>{@else if it.id == 2}<span class="label label-danger">红牌</span>{@/if}',
                    '</td>',
                    '<td class="mail-ontact"><a href="taskDetail.html">${it.companyName}</a>',
                    '</td>',
                    '<td class="mail-subject"><a href="taskDetail.html">{@if it.task != null }${it.task}{@else}暂无检查任务安排{@/if}</a>',
                    '</td>',
                    '<td class="">',
                    '</td>',
                    '<td class="text-right mail-date">${it.doubleRandom.doubleRandomDate}</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#tContent').html(html);
            }
        },
    });
};