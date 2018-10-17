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

$cakeDescription = 'Communication Portal';
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
    <title>NSU HELP DESK</title>
    <!-- Custom CSS -->
    <?= $this->Html->css(['style.min','comm_style']) ?>
</head>

<style type="text/css">
    /*body {
        background-image: url("<?= $this->Html->image('nsuhelpdesk.jpg') ?>'");
    }*/
</style>
<?php //echo $this->Html->image('nsuhelpdesk.jpg'); ?>
<body background="<?= $this->request->getAttribute('webroot').'img/nsuhelpdesk.jpg'; ?>">
    <div class="main-wrapper">
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <div class="preloader">
            <div class="lds-ripple">
                <div class="lds-pos"></div>
                <div class="lds-pos"></div>
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <?= $this->Flash->render() ?>
		<div class="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark" style="background-image: url('<?= $this->request->getAttribute('webroot')."/img/nsuhelpdesk.jpg"?>'); background-repeat: no-repeat;  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;">
			<?= $this->fetch('content') ?>
		</div>
        <!-- background-repeat: no-repeat;  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; -->
        <!-- ============================================================== -->
        <!-- Login box.scss -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper scss in scafholding.scss -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper scss in scafholding.scss -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Right Sidebar -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Right Sidebar -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- All Required js -->
    <!-- ============================================================== -->
    <?= $this->Html->script([
        'libs/jquery/dist/jquery.min',
        // Bootstrap tether Core JavaScript
        'libs/popper.js/dist/umd/popper.min',
        'libs/bootstrap/dist/js/bootstrap.min',
        'libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min',
        'extra-libs/sparkline/sparkline',
        'waves',
        'sidebarmenu',
        'custom.min'
    ]) ?>
    <!-- ============================================================== -->
    <!-- This page plugin js -->
    <!-- ============================================================== -->
	<script>
		$('[data-toggle="tooltip"]').tooltip();
		$(".preloader").fadeOut();
	</script>

</body>

</html>
