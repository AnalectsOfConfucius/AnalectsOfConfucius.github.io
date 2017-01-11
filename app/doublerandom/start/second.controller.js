$(function () {
    $.ajax({
        url: window.apiPoint + 'company-types',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            var result = {};
            result['its'] = data;
            var tpl = [
                '<option></option>',
                '{@each its as it,index}',
                '<option value="${it.id}">${it.typeName}</option>',
                '{@/each}'].join('');
            var html = juicer(tpl, result);
            $('#company').html(html);
            console.log(result);
        }
    });
    $.ajax({
        url: window.apiPoint + 'industry-types',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            var result = {};
            result['its'] = data;
            var tpl = [
                '<option></option>',
                '{@each its as it,index}',
                '<option value="${it.id}">${it.typeName}</option>',
                '{@/each}'].join('');
            var html = juicer(tpl, result);
            $('#industry').html(html);
            console.log(result);
        }
    });
    $.ajax({
        url: window.apiPoint + 'lawenforce-departments',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            var result = {};
            result['its'] = data;
            var tpl = [
                '<option></option>',
                '{@each its as it,index}',
                '<option value="${it.id}">${it.departmentName}</option>',
                '{@/each}'].join('');
            var html = juicer(tpl, result);
            $('#department').html(html);
            console.log(result);
        }
    });
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
    var doubleRandomCompanyName = $('#second').find('input[name=doubleRandomCompanyName]').val();
    var doubleRandomCompanyArea = $('#second').find('select[name=doubleRandomCompanyArea]').val();
    var doubleRandomCompanyType = $('#second').find('select[name=doubleRandomCompanyType]').val();
    var doubleRandomCompanySupervisory = $('#second').find('select[name=doubleRandomCompanySupervisory]').val();
    var doubleRandomCompanyIndustryType = $('#second').find('select[name=doubleRandomCompanyIndustryType]').val();
    var doubleRandomCompanyRatio = $('#second').find('input[name=doubleRandomCompanyRatio]').val();
    var query = doubleRandomCompanyName;
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