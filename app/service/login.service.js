$(function() {
	$('.login-action').click(function() {
		localStorage.setItem('token', 'token');
		console.log(localStorage.getItem('token'));
		$('#modal-login').modal('toggle');
		var yellow = 10;
		var red = 100;
		if (red > 0 || yellow > 0) {
			swal({
	        title: "请注意，您已被红黄牌警告！",
	        text: "你已收到红牌警告" + red + "张，收到黄牌预警" + yellow + "张。",
	        type: "warning",
		    });
		}
	});

	$('.logout-action').click(function() {
		localStorage.removeItem('token');
		console.log(localStorage.getItem('token'));
		loginFilter();
	});
});