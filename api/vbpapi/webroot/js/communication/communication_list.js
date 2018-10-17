'use strict';
$(function () {
	$(".status").click( function() {
		$(this);
	});
	$('#communication_table tbody').on('click', '.postComment', function () {
		postComment($(this));
	});
	$('#ictrequest_table').DataTable({});
});

function showComment(param, ident) {
	$.ajax({
		type: 'post',
		async: true,
		cache: false,
		url:'getcomment',
		success: function (response) {
			var comments = $.parseJSON(response);
			var commentPop = '';
			var countComment = 0;
			$.each( comments.comments_data, function( key, value) {
				commentPop += '<div class="comment-widgets scrollable ps-container ps-theme-default" data-ps-id="2b0bcd3b-9b73-1744-2a81-fb741ce83e84">'+
					'<div class="d-flex flex-row comment-row m-t-0">'+
						'<div class="p-2"><img src="http://svgur.com/i/65U.svg" alt="user" width="50" class="rounded-circle"></div>'+
							'<div class="comment-text w-100">'+
							'<h6 class="font-medium">'+value.user.firstname+' '+value.user.lastname+'</h6>'+
							'<span class="m-b-15 d-block">'+value.comment+'</span>'+
							'<div class="comment-footer">'+
								'<span class="text-muted float-right">'+value.post_date+'</span>'+ 
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
				countComment++;
			});
			$(".countComment"+$(param).data('id')).html(countComment);
			$("#commentHere"+$(param).data('id')).html(commentPop);
		},
		error: function(response) {
			toastr.error('Something error in adding communication.', 'Error!');
		},
		data: { communication_id: $(param).data('id') }
	});

	if(ident == 2) {
		$('#commentBox'+$(param).data('id')).toggle('show');
		$('#commentHere'+$(param).data('id')).toggle('show');
		$('#commentBox'+$(param).data('id')).find('textarea').focus();
	}
}

function postComment(objects) {
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var postDate = year + "-" + month + "-" + day;
	var time = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
	$.ajax({
		type: 'post',
		async: true,
		cache: false,
		url:'postcomment',
		success: function (response) {
			var comments = $.parseJSON(response);
			if(comments.result == "success") {
				var commentPop = '<div class="comment-widgets scrollable ps-container ps-theme-default" data-ps-id="2b0bcd3b-9b73-1744-2a81-fb741ce83e84">'+
					'<div class="d-flex flex-row comment-row m-t-0">'+
						'<div class="p-2"><img src="http://svgur.com/i/65U.svg" alt="user" width="50" class="rounded-circle"></div>'+
							'<div class="comment-text w-100">'+
							'<h6 class="font-medium">'+objects.prev().prev().val()+'</h6>'+
							'<span class="m-b-15 d-block">'+comments.comments_data.comment+'</span>'+
							'<div class="comment-footer">'+
								'<span class="text-muted float-right">'+postDate+' '+time+'</span>'+ 
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
				$("#commentHere"+objects.data('id')).prepend(commentPop);
				objects.prev('textarea').val('');	
				var commentCount = (parseInt($(".countComment"+objects.data('id')).text()) + 1);
				$(".countComment"+objects.data('id')).html(commentCount);
				$('#commentBox'+objects.data('id')).find('textarea').focus();
				toastr.success('comment added successfully');
			}
		},
		error: function(response) {
			toastr.error('Something error in adding comments.', 'Error!');
		},
		data: { communication_id: objects.data('id'), comment: objects.prev().val().trim(), users: objects.prev().prev().prev().val(), post_date:postDate+' '+time }
	});		
}