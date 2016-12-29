var wxm = wxm || {};

/**
 * 返回指定的命名空间，如果命名空间不存在则创建命名空间。备注：命名时需小心，注意保留关键字，可能在一些浏览器无法使用。
 * 
 * @param {}
 *            str 至少需要创建一个命名空间
 * @return {} 最后一个命名空间创建的对象的引用
 */
wxm.namespace = function(name) {
    // 拆分名字空间域字符串
    var domains = name.split(".");
    var cur_domain = window;
    // 循环遍历每一级子域
    for (var i = 0; i < domains.length; i++) {
        var domain = domains[i];
        // 如果该域的空间未被创建
        if (typeof (cur_domain[domain]) == "undefined") {
            // 创建域
            cur_domain[domain] = {};
        }
        // 设置当前域为此次循环的域
        cur_domain = cur_domain[domain];
    }
    return cur_domain;
}

wxm.namespace("wxm.util");
/**
 * 按照给定格式替换相应字符
 * 
 * @description wxm.util.format('aaa{0}bb{1}ccc', 'AA', 'BB') => 'aaaAAbbBBccc'
 * 
 * @param {}
 *            format
 * @return {}
 */
wxm.util.FormatString = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
}

/**
 * 文本不为空
 * 
 * @description string != null && string != '' => true | ≠> false
 * @param {}
 *            string
 */
wxm.util.hasText = function(string) {
    if (string != null && string != '') {
        return true;
    }
    return false;
}

/**
 * 对话框插件
 * 
 * @param {}
 *            option.type 类型 success|error|info|danger|confirm
 * @param {}
 *            option.message 信息
 * @param {}
 *            option.style 对话框样式
 * @param {}
 *            option.callback 回调函数 {correct : Fun1, cancel : Fun2}（非必填）
 */
wxm.dialog = function(option) {
    // 页面主体
    var $body = $(window.document.body);
    // 背景容器
    var $background = $('<div class="wxm-maskBackground"></div>');
    // 对话框容器
    var $box = $('<div class="wxm-dialog-box"></div>');
    // 对话框头部
    var $header = $('<div class="wxm-dialog-header"></div>');
    // 对话框头部图标
    var $headerIcon = $(wxm.util.FormatString('<i class="{0}"></i>', option && (option.type ? wxm.dialog.ICON[option.type] : wxm.dialog.ICON.success) || wxm.dialog.ICON.success));
    // 对话框提示信息容器
    var $alert = $(wxm.util.FormatString('<div class="alert">{0}</div>', option && (option.message || '操作成功') || '操作成功'));
    // 对话框底部
    var $footer = $('<div class="wxm-dialog-fotter"></div>');
    // 对话框确定按钮
    var $correctBtn = $('<span class="btn btn-default">确定</span>');
    // 对话框取消按钮
    var $cancelBtn = $('<span class="btn btn-default">取消</span>');
    // 当前窗口高度
    var windowHeight = $(window).height();
    // 当前窗口宽度
    var windowWidth = $(window).width();

    // 将各元素嵌入页面
    $body.append($background);
    $body.append($box);
    $box.append($header);
    $box.append($alert);
    $box.append($footer);
    $header.append($headerIcon);
    $header.append('提示信息');
    $footer.append($correctBtn);
    if (option && option.type == wxm.dialog.TYPE.confirm) {
        $footer.append($cancelBtn);
    }
    // 设置背景容器样式，使其顶部外边距为2，且高度-2
    $background.css('background-color', '#000');
    $background.css('margin-top', '2px');
    $background.height($background.height() - 2);

    // 设置对话框垂直居中
    $box.css('top', windowHeight / 2 - $box.height() + 'px');
    $box.css('left', windowWidth / 2 - $box.width() / 2 + 'px');

    // 设置提示信息高度，使底部按钮容器紧贴对话框底部
    var alertHeight = $box.height() - $header.outerHeight() - $footer.outerHeight() - 20;
    $alert.height(alertHeight);
    $alert.css("line-height", alertHeight + "px");

    // 配置提示信息
    if (option && wxm.util.hasText(option.style) && wxm.util.hasText(option.style.alertFontSize)) {
        $alert.css('font-size', option.style.alertFontSize + 'px');
    }

    // 绑定确定按钮事件
    $correctBtn.on('click', function() {
        wxm.dialog.close($background, $box);
        if (option && wxm.util.hasText(option.callback) && wxm.util.hasText(option.callback.correct)) {
            option.callback.correct();
        }
    });
    // 绑定取消按钮事件
    $cancelBtn.on('click', function() {
        wxm.dialog.close($background, $box);
        if (option && wxm.util.hasText(option.callback) && wxm.util.hasText(option.callback.cancel)) {
            option.callback.cancel();
        }
    })
}

wxm.dialog.TYPE = {
    success : 'success', // 成功
    error : 'error', // 失败
    info : 'info', // 提示
    danger : 'danger', // 危险
    confirm : 'confirm' // 确认
}

wxm.dialog.ICON = {
    success : 'fa fa-check-circle', // 成功
    error : 'fa fa-times-circle', // 失败
    info : 'fa fa-info-circle', // 提示
    danger : 'fa fa-exclamation-triangle', // 危险
    confirm : 'fa fa-question-circle' // 确认
}

wxm.dialog.ALERT = {
    success : 'success', // 成功
    error : 'danger', // 失败
    info : 'info', // 提示
    danger : 'warning', // 危险
    confirm : 'warning' // 确认
}

/**
 * 关闭对话框
 * 
 * @param {}
 *            $background 背景容器
 * @param {}
 *            $box 对话框容器
 */
wxm.dialog.close = function($background, $box) {
    $background.remove();
    $box.remove();
}