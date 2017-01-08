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
                        '<a href="javascript:;" onclick="deleteOne()">删除</a>',
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
        initPage(page_index, size);
    };


    $('.input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });
});

function deleteOne() {
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
};