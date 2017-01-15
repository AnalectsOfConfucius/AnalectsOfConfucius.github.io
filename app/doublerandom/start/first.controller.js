$(function () {
    $('.chosen-select').chosen({});
    /*$.ajax({
        url: window.apiPoint + 'tasks',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                data["tasks"] = {}
                var tpl = [
                    '<option value=""></option>',
                    '{@each doubleRandomResults as it,index}',
                    '<optgroup label="商标检查">',
                    '<option>商标违规</option>',
                    '</optgroup>',
                    '{@/each}'].join('');
                var html = juicer(tpl, data);
                $('#tContent').html(html);
            }
        },
    });*/
});