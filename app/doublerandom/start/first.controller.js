$(function () {
    $('.chosen-select').chosen({});
    $.ajax({
        url: window.apiPoint + 'task-projects/tasks',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log(data);
                data["taskProjects"] = data;
                var tpl = [
                    '<option value=""></option>',
                    '{@each taskProjects as it,index}',
                    '<optgroup label="{$it.taskProjectName}">',
                        '{@each it. as it,index}',
                        '<option>商标违规</option>',
                        '{@/each}',
                    '</optgroup>',
                    '{@/each}'].join('');
                var html = juicer(tpl, data);
                $('#tContent').html(html);
            }
        },
    });
});