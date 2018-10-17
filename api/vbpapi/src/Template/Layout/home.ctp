<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = 'NSU HELP DESK';
?>
<!DOCTYPE html>
<html>
<!DOCTYPE html>
<html dir="ltr">
<head>
    <?= $this->Html->charset() ?>
    <?= $this->Html->meta([
        'http-equiv' => 'X-UA-Compatible',
        'content' => 'IE=edge'
    ]) ?>
    <!-- Tell the browser to be responsive to screen width -->
    <?= $this->Html->meta(
        'viewport',
        'width=device-width, initial-scale=1'
    ) ?>
    <?= $this->Html->meta(
        'description'
    ) ?>
    <?= $this->Html->meta(
        'author'
    ) ?>
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="../../assets/images/favicon.png">
    <title>NSU Help Desk Portal</title>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <?= $this->Html->css([
    	// 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css',
    	'style.min',
    	'comm_home',
    	'datatables.net-bs4/css/dataTables.bootstrap4',
    	'bootstrap-datepicker/dist/css/bootstrap-datepicker.min',
    	// 'quill/dist/quill.snow',
    	'toastr/build/toastr.min',
    	'select2/dist/css/select2.min',
    	// 'static'
    ]) ?>
</head>
<style type="text/css">
	@keyframes placeHolderShimmer{
		0%{
			background-position: -468px 0
		}
		100%{
			background-position: 468px 0
		}
	}
	.loadingAnimated {
		animation-duration: 1s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-name: placeHolderShimmer;
		animation-timing-function: linear;
		background: #f6f7f8;
		background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
		background-size: 800px 104px;
		height: 96px;
		position: relative;
	}
</style>
<body>
    
	<!-- ============================================================== -->
	<!-- Main wrapper - style you can find in pages.scss -->
	<!-- ============================================================== -->
	<div id="main-wrapper">
	    <!-- ============================================================== -->
	    <!-- Topbar header - style you can find in pages.scss -->
	    <!-- ============================================================== -->
	    <?php echo $this->element('home/header') ?>
	    <!-- ============================================================== -->
	    <!-- End Topbar header -->
	    <!-- ============================================================== -->
	    <!-- ============================================================== -->
	    <!-- Left Sidebar - style you can find in sidebar.scss  -->
	    <!-- ============================================================== -->
	    <?php echo $this->element('home/sidebar') ?>
	    <!-- ============================================================== -->
	    <!-- End Left Sidebar - style you can find in sidebar.scss  -->
	    <!-- ============================================================== -->
	    <!-- ============================================================== -->
	    <!-- Page wrapper  -->
	    <!-- ============================================================== -->
	    <div class="page-wrapper">
	        <!-- ============================================================== -->
	        <!-- Bread crumb and right sidebar toggle -->
	        <!-- ============================================================== -->
	        <?= $this->Flash->render() ?>
	         <div class="page-breadcrumb">
	            <div class="row">
	                <div class="col-12 d-flex no-block align-items-center">
	                    <h4 class="page-title"><?= isset($page_title)? $page_title : '' ?></h4>
	                </div>
	            </div>
	        </div>
	        <!-- ============================================================== -->
	        <!-- End Bread crumb and right sidebar toggle -->
	        <!-- ============================================================== -->
	        <!-- ============================================================== -->
	        <!-- Container fluid  -->
	        <!-- ============================================================== -->
	        <div class="container-fluid">
	            <!-- ============================================================== -->
	            <!-- Applications  -->
	            <!-- ============================================================== -->
	          	<?= $this->fetch('content') ?>
	        </div>
	        <!-- ============================================================== -->
	        <!-- End Container fluid  -->
	        <!-- ============================================================== -->
	        <!-- ============================================================== -->
	        <!-- footer -->
	        <!-- ============================================================== -->
	        <footer class="footer text-center">
	            Communication Portal Copyright @ 2018
	        </footer>
	        <!-- ============================================================== -->
	        <!-- End footer -->
	        <!-- ============================================================== -->
	    </div>
	    <!-- ============================================================== -->
	    <!-- End Page wrapper  -->
	    <!-- ============================================================== -->
	</div>
	<!-- ============================================================== -->
	<!-- End Wrapper -->
	<!-- ============================================================== -->

    <!-- ============================================================== -->
    <!-- All Required js -->
    <!-- ============================================================== -->

	<?= $this->Html->script([
		'http://code.jquery.com/jquery-1.9.1.js',
		'libs/popper.js/dist/umd/popper.min',
		'libs/bootstrap/dist/js/bootstrap.min',
		'libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min',
		'extra-libs/sparkline/sparkline',
		'waves',
		'sidebarmenu',
		'custom.min',
		'extra-libs/multicheck/datatable-checkbox-init',
		'extra-libs/multicheck/jquery.multicheck',
		'extra-libs/DataTables/datatables.min',
		'libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min',
		'libs/quill/dist/quill.min',
		'libs/toastr/build/toastr.min',
		'https://code.jquery.com/ui/1.12.1/jquery-ui.js',
		'communication',
		'Connection',
		'communication/communication_list',
		'libs/select2/dist/js/select2.full.min',
		'libs/select2/dist/js/select2.min'
	]) ?>
    <!-- ============================================================== -->
    <!-- This page plugin js -->
    <!-- ============================================================== -->
    <script type="text/javascript">

		var BASE_URL = "<?= BASE_URL; ?>";
		var Broadcast = {
			POST : "<?php echo POST; ?>",
			BROADCAST_URL : "<?php echo BROADCAST_URL; ?>",
			BROADCAST_PORT : "<?php echo BROADCAST_PORT; ?>",
		};
		var connection = new Connection(Broadcast.BROADCAST_URL+":"+Broadcast.BROADCAST_PORT);
		console.log(connection);

		$(function () {
			$("#tickets").DataTable({});
			$("#departmentsTable").DataTable({});
			$("#officesTable").DataTable({});
			$("#servicesTable").DataTable({});
			$("#technicalsTable").DataTable({});
			$("#tecgroupTable").DataTable({});
			$(".select2").select2({
				placeholder: "Please Select",
				allowClear: true
			});
			var issue = ("<?php echo $checkIssues ?>");

			if(issue > 0) 
			{
				$('.communicationProblem').trigger('click');
			}

			$('.communicationProblem').click(function(){
				$('#communicatioModal').modal({
					backdrop: 'static',
					keyboard: false
				});
			}); 
			
			$('#previous_communication').DataTable( {
				drawCallback: function() {
					$('[data-toggle="popover"]').popover();
				} 
			} );

			$('[data-toggle="tooltip"]').tooltip();
			$(".preloader").fadeOut();
		});
	</script>

</body>

</html>
