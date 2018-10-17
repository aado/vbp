$(function() {
	'use strict';

	$('.popper').popover({
		container: 'body',
		html: true,
		content: function () {
			return $(this).next('.popper-content').html();
		}
	});

	/****************************************
	*       Popup communication             *
	****************************************/

	$(".checkAcknowledge").change( function () {
		$(".btnAcknowledge"+$(this).data('id')).show().prev().hide();
	});

	$(".acknowledgeme").click( function() {
		$("#acknowledid").val($(this).data('id'));
		toastr.success('Acknowledge Successfull.','Success');
		window.setTimeout( function () {
			$("#acknowledge").submit();
		}, 1000);
	});


	/****************************************
	*       End Popup communication             *
	****************************************/

	/****************************************
	*       Sortable Widgets                *
	****************************************/
	$( "#sortable" ).sortable({
		update: function (event, ui) {
			saveDrag();
		}
	});
	$( "#sortable" ).disableSelection();
	$( document ).tooltip({
		position: {
			my: "center bottom-20",
			at: "center top",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" )
				.addClass( "arrow" )
				.addClass( feedback.vertical )
				.addClass( feedback.horizontal )
				.appendTo( this );
			}
		}
	});
	/****************************************
	*       End Sortable Widgets            *
	****************************************/

	/****************************************
	*       Basic Table                   *
	****************************************/

	$('#start-date, #stop-date').datepicker(
	{	
		changeYear: true,
		changeMonth: true,
		dateFormat: "yy-mm-dd",
		minDate: 0,
		setDate: new Date()
	});
	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();
	$( document ).tooltip({
		position: {
			my: "center bottom-20",
			at: "center top",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" )
				.addClass( "arrow" )
				.addClass( feedback.vertical )
				.addClass( feedback.horizontal )
				.appendTo( this );
			}
		}
	});

	/****************************************
	*       End Widget Table                *
	****************************************/
   var table = $('#widgetList').DataTable({
      // 'ajax': {
      //    'url': '/lab/articles/jquery-datatables-how-to-add-a-checkbox-column/ids-arrays.txt'
      // },
      'columnDefs': [{
         'targets': 0,
         'searchable': false,
         'orderable': false,
         'className': 'dt-body-center',
         'render': function (data, type, full, meta){
             return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
         }
      }],
      'order': [[1, 'asc']]
   });

   // Handle click on "Select all" control
   $('#example-select-all').on('click', function(){
      // Get all rows with search applied
      var rows = table.rows({ 'search': 'applied' }).nodes();
      // Check/uncheck checkboxes for all rows in the table
      $('input[type="checkbox"]', rows).prop('checked', this.checked);
   });

   // Handle click on checkbox to set state of "Select all" control
   $('#example tbody').on('change', 'input[type="checkbox"]', function(){
      // If checkbox is not checked
      if(!this.checked){
         var el = $('#example-select-all').get(0);
         // If "Select all" control is checked and has 'indeterminate' property
         if(el && el.checked && ('indeterminate' in el)){
            // Set visual state of "Select all" control
            // as 'indeterminate'
            el.indeterminate = true;
         }
      }
   });

   // Handle form submission event
   $('#frm-example').on('submit', function(e){
      var form = this;

      // Iterate over all checkboxes in the table
      table.$('input[type="checkbox"]').each(function(){
         // If checkbox doesn't exist in DOM
         if(!$.contains(document, this)){
            // If checkbox is checked
            if(this.checked){
               // Create a hidden element
               $(form).append(
                  $('<input>')
                     .attr('type', 'hidden')
                     .attr('name', this.name)
                     .val(this.value)
               );
            }
         }
      });
   });
	/****************************************
	*    End Widget Table                   *
	****************************************/

});

// drag widgets	
function saveDrag() 
{
	var theListArray = [];
	$("li", "#sortable").each( function (count, item) {
		theListArray[count] = $(this).text();
	});
	var appList = theListArray.toString();
}	

// trigge modal communication
function triggerModalData(id, title) {
	$("#view_content").attr('class','loadingAnimated').html('');
	$.ajax({
		type: 'POST',
		url: 'modaldata',
		data: {id: id, title: title},
		dataType: 'json',
		success: function (response) {
			$("#view_title").html(response.request);
			$("#view_content").html(response.communication.message).removeAttr('class');
		},
		error: function () {
			alert('error');
		}
	});
}

