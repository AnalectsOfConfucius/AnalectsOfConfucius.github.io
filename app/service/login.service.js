$(function() {
	$('.login-action').click(function() {
		localStorage.setItem('token', 'token');
		console.log(localStorage.getItem('token'));
		$('#modal-login').modal('toggle');
	});

	$('.logout-action').click(function() {
		localStorage.removeItem('token');
		console.log(localStorage.getItem('token'));
		loginFilter();
	});
});