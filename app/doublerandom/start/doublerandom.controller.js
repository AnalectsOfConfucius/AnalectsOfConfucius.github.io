$('.first-action').click(function () {
    var doubleRandomName = $('#first').find('input[name=doubleRandomName]').val();
    var doubleRandomNotary = $('#first').find('input[name=doubleRandomNotary]').val();
    var doubleRandomDate = $('#first').find('input[name=doubleRandomDate]').val();
    var tasks = $('#first').find('select[name=tasks]').val();
    localStorage.setItem("doubleRandomName", doubleRandomName);
    localStorage.setItem("doubleRandomNotary", doubleRandomNotary);
    localStorage.setItem("doubleRandomDate", doubleRandomDate);
    localStorage.setItem("tasks", tasks);
    console.log(tasks);
    location.href = "second.html";
});
$('.second-action').click(function () {
    var doubleRandomCompanyName = $('#second').find('input[name=doubleRandomCompanyName]').val();
    var doubleRandomCompanyArea = $('#second').find('select[name=doubleRandomCompanyArea]').val();
    var doubleRandomCompanyType = $('#second').find('select[name=doubleRandomCompanyType]').val();
    var doubleRandomCompanySupervisory = $('#second').find('select[name=doubleRandomCompanySupervisory]').val();
    var doubleRandomCompanyIndustryType = $('#second').find('select[name=doubleRandomCompanyIndustryType]').val();
    var doubleRandomCompanyRatio = $('#second').find('input[name=doubleRandomCompanyRatio]').val();
    localStorage.setItem("doubleRandomCompanyName", doubleRandomCompanyName);
    localStorage.setItem("doubleRandomCompanyArea", doubleRandomCompanyArea);
    localStorage.setItem("doubleRandomCompanyType", doubleRandomCompanyType);
    localStorage.setItem("doubleRandomCompanySupervisory", doubleRandomCompanySupervisory);
    localStorage.setItem("doubleRandomCompanyIndustryType", doubleRandomCompanyIndustryType);
    localStorage.setItem("doubleRandomCompanyRatio", doubleRandomCompanyRatio);
    console.log(doubleRandomCompanyRatio);
    location.href = "third.html";
});
$('.third-action').click(function () {
    var doubleRandomManagerName = $('#third').find('input[name=doubleRandomManagerName]').val();
    var doubleRandomManagerNumber = $('#third').find('select[name=doubleRandomManagerNumber]').val();
    var doubleRandomManagerDepartment = $('#third').find('select[name=doubleRandomManagerDepartment]').val();
    var doubleRandomManagerRatio = $('#third').find('input[name=doubleRandomManagerRatio]').val();
    localStorage.setItem("doubleRandomManagerName", doubleRandomManagerName);
    localStorage.setItem("doubleRandomManagerNumber", doubleRandomManagerNumber);
    localStorage.setItem("doubleRandomManagerDepartment", doubleRandomManagerDepartment);
    localStorage.setItem("doubleRandomManagerRatio", doubleRandomManagerRatio);
    console.log(doubleRandomManagerRatio);
    //iframe窗
    layer.open({
        type: 2,
        title: '双随机抽选',
        area: ['500px', '300px'],
        content: '/app/doublerandom/start/ing.html'
    });
});
$('.finish-action').click(function () {
    location.href = "fourth.html";
});