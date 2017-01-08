$(function () {
    var size = 10;
    initPage(0, size);
    function initPage(page, size) {
        var url = window.apiPoint + 'companies/normal';
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
            error: function (data) {
            },
            success: function (data) {
                if (data) {
                    console.log(data.companies);
                    var tpl = [
                        '{@each companies as it,index}',
                        '<tr>',
                        '<td>${it.companyRegisterId}</td>',
                        '<td>${it.companyName}</td>',
                        '<td>${it.businessAddress}</td>',
                        '<td>${it.companyOwner}</td>',
                        '<td>${it.companyPhone}</td>',
                        '<td>${it.companyName}</td>',
                        '<td>${it.companyStatus}</td>',
                        '<td>${it.description}</td>',
                        '<td>',
                        '<a href="javascript:;" data-toggle="modal" data-target="#myModal1">查看</a>',
                        '<a href="javascript:;" data-toggle="modal" data-target="#myModal2">修改</a>',
                        '<a href="javascript:;" class="delete-action">删除</a>',
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
    }

    function pageSelect(page_index) {
        initPage(page_index, size);
    }
});