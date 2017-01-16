$(function () {
    setInterval('autoScroll(".maquee")', 2000);
    //退出全屏
    var url = window.apiPoint + 'double-random-results/doubleRandom';
    console.log(url);
    var dataQuery = {
        page: 0,
        size: 1000,
        doubleRandomId: 1
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
                var totalCount = xhr.getResponseHeader("X-Total-Count");
                var nowpage = parseInt(totalCount / dataQuery.size);
                var result = {};
                result['doubleRandomResults'] = data;
                console.log(data);
                var tpl = [
                    '{@each doubleRandomResults as it,index}',
                    '<tr>',
                    '<td>${it.id}</td>',
                    '<td>{@if it.doubleRandom.doubleRandomTaskContent != null }${it.doubleRandom.doubleRandomTaskContent}{@/if}</td>',
                    '<td>${it.companyName}</td>',
                    '<td>${it.companyRegisterId}</td>',
                    '<td>${it.doubleRandom.doubleRandomDate}</td>',
                    '<td>{@if it.result != null }${it.result}{@/if}责令查改</td>',
                    '<td>{@if it.resultDeal != null }${it.result}{@/if}已整改</td>',
                    '<td>{@if it.resultStatus != null }${it.result}{@/if}正常</td>',
                    '</tr>',
                    '{@/each}'].join('');
                var html = juicer(tpl, result);
                $('#tContent').html(html);
            }
        },
    });
})

function autoScroll(obj) {
    $(obj).find("tbody").animate({
        marginTop: "-35px"
    }, 500, function () {
        $(this).css({marginTop: "0px"}).find("tr:first").appendTo(this);
    })
};

function clickBody() {
    var docElm = document.documentElement;
    launchFullscreen(docElm);
};

function launchFullscreen(element) {
    //此方法不可以在異步任務中執行，否則火狐無法全屏
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById('videobox');
        var cssText = 'width:100%;height:100%;overflow:hidden;';
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
        videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';
        document.IsFullScreen = true;
    }
};
