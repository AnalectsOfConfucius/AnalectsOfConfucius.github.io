$(function () {
    window.apiPoint = 'http://localhost:8080/api/';
});
function getUrlValue(name) {
    var str = window.location.search;
    if (str.indexOf(name) != -1) {
        var pos_start = str.indexOf(name) + name.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        if (pos_end == -1) {
            return str.substring(pos_start);
        } else {
            alert("页面参数传递错误!");
        }
    }
};