$(function () {
    $("#ionrange").ionRangeSlider({
        min: 0,
        max: 100,
        type: 'single',
        step: 1,
        postfix: "%",
        prettify: false,
        hasGrid: true
    });
    initQuery(0, 10);
    $('.search-action').click(function () {
        initQuery(0, 10);
    });
});

function initQuery(page, size) {
    var doubleRandomManagerName = $('#third').find('input[name=doubleRandomManagerName]').val();
    var doubleRandomManagerNumber = $('#third').find('select[name=doubleRandomManagerNumber]').val();
    var doubleRandomManagerDepartment = $('#third').find('select[name=doubleRandomManagerDepartment]').val();
    var doubleRandomManagerRatio = $('#third').find('input[name=doubleRandomManagerRatio]').val();
    var query = doubleRandomManagerName;
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
        url: url,
        type: 'GET',
        // GET请求传递data
        data: dataQuery,
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data.managers);
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

function pageQuery(page_index) {
    initQuery(page_index, 10);
};