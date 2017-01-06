$(function() {
	$.ajaxSetup({
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		beforeSend: function(xhr) {
			if (localStorage.getItem('token')) {
				xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
			} else {
				window.location.replace("/app/auth/login.html");
			}
		},
		complete: function(XMLHttpRequest, textStatus) {},
		statusCode: {
			401: function() {
				alert('认证失败，请重新登陆。401');
				window.location.replace("/app/auth/login.html");
			},
			404: function() {
				alert('数据获取/输入失败，没有此服务。404');
			},
			504: function() {
				alert('数据获取/输入失败，服务器没有响应。504');
			},
			500: function() {
				alert('服务器有误。500');
			}
		}
	});
});