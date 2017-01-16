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
    $.ajax({
        url: window.apiPoint + 'lawenforce-departments',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                var result = {};
                result["lawenforceDepartments"] = data;
                var tpl = [
                    '<option value=""></option>',
                    '{@each lawenforceDepartments as it,index}',
                    '<option value="${it.id}">${it.departmentName}</option>',
                    '{@/each}'].join('');
                var html = juicer(tpl, data);
                $('#tContent1').html(html);
            }
        },
    });
    $.ajax({
        url: window.apiPoint + 'lawenforce-departments',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                var result = {};
                result["lawenforceDepartments"] = data;
                var tpl = [
                    '<option value=""></option>',
                    '{@each lawenforceDepartments as it,index}',
                    '<option value="${it.id}">${it.departmentName}</option>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#lawenforceDepartments').html(html);
            }
        },
    });
    $.ajax({
        url: window.apiPoint + 'industry-types',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                var result = {};
                result["industryTypes"] = data;
                var tpl = [
                    '<option value=""></option>',
                    '{@each industryTypes as it,index}',
                    '<option value="${it.id}">${it.typeName}</option>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#industryTypes').html(html);
            }
        },
    });
    $.ajax({
        url: window.apiPoint + 'company-types',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                var result = {};
                result["companyTypes"] = data;
                var tpl = [
                    '<option value=""></option>',
                    '{@each companyTypes as it,index}',
                    '<option value="${it.id}">${it.typeName}</option>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#companyTypes').html(html);
            }
        },
    });
    initQuery(0, 10);
    $('.search-action').click(function () {
        initQuery(0, 10);
    });
});

function initQuery(page, size) {
    var doubleRandomCompanyName = $('#second').find('input[name=doubleRandomCompanyName]').val();
    var doubleRandomCompanyType = $('#second').find('select[name=doubleRandomCompanyType]').find("option:selected").text();
    var doubleRandomCompanySupervisory = $('#second').find('select[name=doubleRandomCompanySupervisory]').find("option:selected").text();
    var doubleRandomCompanyIndustryType = $('#second').find('select[name=doubleRandomCompanyIndustryType]').find("option:selected").text();
    var doubleRandomCompanyRatio = $('#second').find('input[name=doubleRandomCompanyRatio]').val();
    var query = doubleRandomCompanyName + doubleRandomCompanyType + doubleRandomCompanySupervisory + doubleRandomCompanyIndustryType;
    /*if (query == "" || query == null) {
     return;
     }*/
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
        success: function (data, status, xhr) {
            if (data && data.length > 0) {
                $('.second-action').show();
                var result = {};
                result['companies'] = data;
                var totalCount = xhr.getResponseHeader("X-Total-Count");
                var nowpage = parseInt(totalCount / dataQuery.size);
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
                var html = juicer(tpl, result);
                $('#tContent').html(html);
                $("#Pagination").pagination(nowpage, {
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