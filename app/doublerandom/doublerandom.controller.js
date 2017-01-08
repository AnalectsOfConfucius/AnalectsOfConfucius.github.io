$('.first-action').click(function () {
    var doubleRandomName = $('#first').find('input[name=doubleRandomName]').val();
    var doubleRandomNotary = $('#first').find('input[name=doubleRandomNotary]').val();
    var doubleRandomDate = $('#first').find('input[name=doubleRandomDate]').val();
    localStorage.setItem("doubleRandomName", doubleRandomName);
    localStorage.setItem("doubleRandomNotary", doubleRandomNotary);
    localStorage.setItem("doubleRandomDate", doubleRandomDate);
    console.log(doubleRandomName);
    location.href = "second.html";
});
$('.second-action').click(function () {
    var doubleRandomCompanyName = $('#second').find('input[name=doubleRandomCompanyName]').val();
    var doubleRandomCompanyArea = $('#second').find('select[name=doubleRandomCompanyArea]').val();
    var doubleRandomCompanyType = $('#second').find('select[name=doubleRandomCompanyType]').val();
    var doubleRandomCompanySupervisory = $('#second').find('select[name=doubleRandomCompanySupervisory]').val();
    var doubleRandomCompanyIndustryType = $('#second').find('select[name=doubleRandomCompanyIndustryType]').val();
    var doubleRandomCompanyRatio = document.getElementById('ionrange').value;
    localStorage.setItem("doubleRandomCompanyName", doubleRandomCompanyName);
    localStorage.setItem("doubleRandomCompanyArea", doubleRandomCompanyArea);
    localStorage.setItem("doubleRandomCompanyType", doubleRandomCompanyType);
    localStorage.setItem("doubleRandomCompanySupervisory", doubleRandomCompanySupervisory);
    localStorage.setItem("doubleRandomCompanyIndustryType", doubleRandomCompanyIndustryType);
    localStorage.setItem("doubleRandomCompanyRatio", doubleRandomCompanyRatio);
    console.log(doubleRandomCompanyRatio);
    location.href = "third.html";
});