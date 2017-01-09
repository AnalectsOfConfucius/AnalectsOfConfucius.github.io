$(function () {
    initPage(0, 10);
    $('.search-action').click(function () {
        initQuery(0, 10);
    });
});

function initQuery(page, size) {
    var query = $('#query').val();
    if (query == "" || query == null) {
        initPage(0, 10);
        return;
    }
    console.log(query);
    var dataQuery = {
        page: page,
        size: size,
        query: query,
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
                var tpl = [
                    '{@each doubleRandomResults as it,index}',
                    '<tr class="{@if it.task != null }read{@else}unread{@/if}">',
                    '<td class="check-mail">',
                    '</td>',
                    '<td class="mail-ontact"><a href="taskDetail.html">${it.companyName}</a>',
                    '</td>',
                    '<td class="mail-subject"><a href="taskDetail.html">${it.task}</a>',
                    '</td>',
                    '<td class="">',
                    '</td>',
                    '<td class="text-right mail-date">${it.doubleRandom.doubleRandomDate}</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, data);
                $('#tContent').html(html);
            }
        },
    });
};

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
                var html = juicer(tpl, data);
                $('#tContent').html(html);
            }
        },
    });
};

function deleteOne(id) {
    swal({
            title: "您确定要删除这条信息吗",
            text: "删除后将无法恢复，请谨慎操作！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，我要删除！",
            cancelButtonText: "让我再考虑一下…",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    url: window.apiPoint + 'task-projects/' + id,
                    type: 'DELETE',
                    async: true,
                    dataType: 'json',
                    complete: function (data) {
                        console.log(data);
                        if (data.status == 200 && data.statusText == "OK") {
                            swal("删除成功！", "您已经永久删除了这条信息。", "success");
                            initPage(0, 10);
                        }
                    },
                });
            } else {
                swal("已取消", "您取消了删除操作！", "error");
            }
        });
};