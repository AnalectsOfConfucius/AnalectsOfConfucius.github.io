$(function() {
	loginFilter();
});

function loginFilter() {
		if (!localStorage.getItem('token')) {
	        $('#modal-login').modal({show:true, backdrop:'static', keyboard:false});
	        // show 显示||backdrop 点击遮盖层不隐藏||ketboard 键盘esc不隐藏
    	} else {
    		var yellow = 10;
		var red = 100;
		if (red > 0 || yellow > 0) {
			swal({
	        title: "请注意，您已被红黄牌警告！",
	        text: "你已收到红牌" + red + "张，收到黄牌" + yellow + "张。",
	        type: "warning",
		    });
		}
    	}
	}