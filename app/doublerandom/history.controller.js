$(function () {
    initPage(0, 10);
    $('.chosen-select').chosen({});
    $('.delete-action').click(function () {
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
                    swal("删除成功！", "您已经永久删除了这条信息。", "success");
                } else {
                    swal("已取消", "您取消了删除操作！", "error");
                }
            });
    });
});

function initPage(page, size) {
    var url = window.apiPoint + 'double-randoms';
    console.log(url);
    var dataQuery = {
        page: page,
        size: size
    };
    console.log(dataQuery);
    $.ajax({
        url: url,
        type: 'GET',
        // GET请求传递data
        data: dataQuery,
        async: true,
        dataType: 'json',
        success: function (data, status, xhr) {
            if (data) {
                var totalCount = xhr.getResponseHeader("X-Total-Count");
                var nowpage = parseInt(totalCount / dataQuery.size);
                var result = {};
                result['doubleRandom'] = data;
                console.log(data);
                var tpl = [
                    '{@each doubleRandom as it,index}',
                    '<tr>',
                    '<td>${it.id}</td>',
                    '<td>{@if it.doubleRandomTaskContent != null }${it.doubleRandomTaskContent}{@/if}</td>',
                    '<td>${it.doubleRandomDate}</td>',
                    '<td>{@if it.doubleRandomNotary != null }${it.doubleRandomNotary}{@/if}</td>',
                    '<td>${it.doubleRandomCompanyCount}</td>',
                    '<td></td>',
                    '<td>',
                    '<a href="javascript:;" onclick="detailOne(${it.id})">详情</a>',
                    '<a href="javascript:;" onclick="deleteOne(${it.id})">删除</a>',
                    '</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#tContent').html(html);
                $("#Pagination").pagination(nowpage, {
                    'current_page': dataQuery.page,
                    'callback': pageSelect,
                });
            }
        },
    });
};

function pageSelect(page_index) {
    initPage(page_index, 10);
};

function detailOne(id) {
    console.log(id);
    var dataQuery = {
        page: 0,
        size: 1000,
        doubleRandomId: id
    };
    $.ajax({
        url: window.apiPoint + 'double-random-results/doubleRandom',
        type: 'GET',
        async: true,
        // GET请求传递data
        data: dataQuery,
        dataType: 'json',
        success: function (data, status, xhr) {
            if (data) {
                var totalCount = xhr.getResponseHeader("X-Total-Count");
                var nowpage = parseInt(totalCount / dataQuery.size);
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
                    '<td>${it.doubleRandom.doubleRandomDate}</td>',
                    '<td>{@if it.doubleRandom.doubleRandomTaskContent != null }${it.doubleRandom.doubleRandomTaskContent}{@/if}</td>',
                    '<td>${it.people}</td>',
                    '<td>{@if it.result != null }${it.result}{@/if}</td>',
                    '<td>{@if it.resultDeal != null }${it.resultDeal}{@/if}</td>',
                    '<td>{@if it.resultStatus != null }${it.resultStatus}{@/if}</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#tContentChild').html(html);
            }
        },
    });
    $('#myModal2').modal("toggle");
};