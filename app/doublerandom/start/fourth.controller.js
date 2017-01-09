var doubleRandomId;
$(function () {
    doubleRandomId = getUrlValue("id");
    console.log(doubleRandomId);
    initPage(0, 10);
});

function initPage(page, size) {
    var url = window.apiPoint + 'double-random-results';
    console.log(url);
    var dataQuery = {
        page: page,
        size: size,
        doubleRandomId: doubleRandomId
    };
    console.log(dataQuery);
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
                    '<tr>',
                    '<td>${it.id}</td>',
                    '<td>${it.companyName}</td>',
                    '<td>${it.companyRegisterId}</td>',
                    '<td>${it.people}</td>',
                    '<td>{@if it.taskContent != null }${it.taskContent}{@/if}</td>',
                    '<td>{@if it.description != null }${it.description}{@/if}</td>',
                    '<td>',
                    '<a href="javascript:;" onclick="detailOne(${it.id})" data-toggle="modal" data-target="#myModal1">法律法规</a>',
                    '<a href="javascript:;" data-toggle="modal" data-target="#myModal2">修改</a>',
                    '<a href="javascript:;" onclick="deleteOne(${it.id})">删除</a>',
                    '</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, data);
                $('#tContent').html(html);
                $("#Pagination").pagination(data.totalPages, {
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