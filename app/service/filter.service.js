$(function() {
	loginFilter();
});

function loginFilter() {
		if (!localStorage.getItem('token')) {
	        $('#modal-login').modal({show:true, backdrop:'static', keyboard:false});
	        // show 显示||backdrop 点击遮盖层不隐藏||ketboard 键盘esc不隐藏
    	}
	}