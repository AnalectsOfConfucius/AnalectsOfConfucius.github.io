$(function () {
    initPage(0, 10);
    $('.search-action').click(function () {
        initQuery(0, 10);
    });
    $('.add-action').click(function () {
        add();
    });
});

function add() {
    var addUrl = window.apiPoint + 'managers';
    var managerId = $("#add").find("input[name=managerId]").val();
    var managerCardId = $("#add").find("input[name=managerCardId]").val();
    var managerName = $("#add").find("input[name=managerName]").val();
    var managerCardType = $("#add").find("select[name=managerCardType]").val();
    var managerSex = $("#add").find("select[name=managerSex]").val();
    var description = $("#add").find("textarea[name=description]").val();
    var managerLawenforceDepartmentId = $("#add").find("select[name=managerLawenforceDepartmentId]").val();
    var managerLawenforceDepartment = {id: managerLawenforceDepartmentId};
    var dataPost = {
        managerId: managerId,
        managerCardId: managerCardId,
        managerName: managerName,
        managerCardType: managerCardType,
        managerSex: managerSex,
        description: description,
        managerLawenforceDepartment: managerLawenforceDepartment
    };
    console.log(dataPost);
    $.ajax({
        url: addUrl,
        type: 'POST',
        // 序列化Json对象为Json字符串
        data: JSON.stringify(dataPost),
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                initPage(0, 10);
                $('#myModal0').modal('hide');
                $('input[name=reset]').trigger("click");
            }
        },
    });
};

function addOne() {
    $.ajax({
        url: window.apiPoint + 'lawenforce-departments',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                data["departments"] = data;
                var tpl = [
                    '<option></option>',
                    '{@each departments as it,index}',
                    '<option value="${it.id}">${it.departmentName}</option>',
                    '{@/each}'].join('');
                var html = juicer(tpl, data);
                $('#addOptionFirst').html(html);
            }
        },
    });
    $.ajax({
        url: window.apiPoint + 'lawenforce-areas',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                data["areas"] = data;
                var tpl = [
                    '<option></option>',
                    '{@each areas as it,index}',
                    '<option value="${it.id}">${it.areaName}</option>',
                    '{@/each}'].join('');
                var html = juicer(tpl, data);
                $('#addOptionSecond').html(html);
            }
        },
    });
};

function initQuery(page, size) {
    var query = $('#query').val();
    if (query == "" || query == null) {
        return;
    }
    console.log(query);
    var dataQuery = {
        page: page,
        size: size,
        query: query,
    };
    $.ajax({
        url: window.apiPoint + '_search/companies',
        type: 'GET',
        // GET请求传递data
        data: dataQuery,
        async: true,
        dataType: 'json',
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
                    '<td>${it.companySupervisory.departmentName}</td>',
                    '<td>${it.companyStatus}</td>',
                    '<td>{@if it.description != null }${it.description}{@/if}</td>',
                    '<td>',
                    '<a href="javascript:;" data-toggle="modal" data-target="#myModal1">查看</a>',
                    '<a href="javascript:;" data-toggle="modal" data-target="#myModal2">修改</a>',
                    '<a href="javascript:;" onclick="deleteOne(${it.id})">删除</a>',
                    '</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, data);
                $('#tContent').html(html);
                $("#Pagination").pagination(data.totalPages, {
                    'current_page': dataQuery.page,
                    'callback': pageQuery,
                });
            }
        },
    });
};

function initPage(page, size) {
    var url = window.apiPoint + 'managers';
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
        success: function (data, status, xhr) {
            if (data) {
                var result = {};
                result['managers'] = data;
                var totalCount = xhr.getResponseHeader("X-Total-Count");
                var nowpage = parseInt(totalCount / dataQuery.size);
                console.log(nowpage);
                var tpl = [
                    '{@each managers as it,index}',
                    '<tr>',
                    '<td>${it.managerCardId}</td>',
                    '<td>${it.managerCardType}</td>',
                    '<td>${it.managerName}</td>',
                    '<td>${it.managerSex}</td>',
                    '<td>{@if it.managerLawenforceDepartment != null }${it.managerLawenforceDepartment.departmentName}{@/if}</td>',
                    '<td>{@if it.managerLawenforceAreas != null }${it.managerLawenforceAreas.areaName}{@/if}</td>',
                    '<td>{@if it.managerFlag != null }${it.managerFlag}{@/if}</td>',
                    '<td>{@if it.checkCount != null }${it.checkCount}{@/if}</td>',
                    '<td>{@if it.description != null }${it.description}{@/if}</td>',
                    '<td>',
                    '<a href="javascript:;" data-toggle="modal" data-target="#myModal1">查看</a>',
                    '<a href="javascript:;" data-toggle="modal" data-target="#myModal2">修改</a>',
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

function pageQuery(page_index) {
    initQuery(page_index, 10);
};

function pageSelect(page_index) {
    initPage(page_index, 10);
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
                    url: window.apiPoint + 'managers/' + id,
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