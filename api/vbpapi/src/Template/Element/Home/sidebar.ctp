<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
<!---============================================================== -->
<!-- Left Sidebar - style you can find in sidebar.scss  -->
<!-- ============================================================== -->
<aside class="left-sidebar" data-sidebarbg="skin5">
	<!-- Sidebar scroll-->
	<div class="scroll-sidebar">
		<!-- Sidebar navigation-->
		<nav class="sidebar-nav">
			<ul id="sidebarnav" class="p-t-30">
				<?php if ($userRole == 1) { ?>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-dashboard"></i> <span class="hide-menu">Dashboard</span>',
								[
									'controller' => 'Tickets',
									'action' => 'dashboard'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
					<li class="sidebar-item">
					<?php
					echo $this->Html->link(
						'<i class="fa fa-ticket"></i> <span class="hide-menu">Tickets</span>',
						[
							'controller' => 'Tickets',
							'action' => 'index'
						],
						[ 
							'escape' => false, 
							'class' => 'sidebar-link waves-effect waves-dark sidebar-link has-arrow' 
						]
					)
					?>
					<ul aria-expanded="false" class="collapse  first-level">
						<li class="sidebar-item">
							<?php
							echo $this->Html->link(
								'<i class="fa fa-plus" aria-hidden="true"></i> <span class="hide-menu">Add New</span>',
								[
									'controller' => 'Tickets',
									'action' => 'add'
								],
								[ 
									'escape' => false,
									'class' => 'sidebar-link' 
								]
							)
							?>
						</li>
						<li class="sidebar-item">
							<?php
							echo $this->Html->link(
								'<i class="fa fa-list-alt" aria-hidden="true"></i> <span class="hide-menu">List</span>',
								[
									'controller' => 'Tickets',
									'action' => 'index'
								],
								[ 
									'escape' => false,
									'class' => 'sidebar-link' 
								]
							)
							?>
						</li>
						<li class="sidebar-item">
							<?php
							echo $this->Html->link(
								'<i class="fa fa-list" aria-hidden="true"></i> <span class="hide-menu">History</span>',
								[
									'controller' => 'Tickets',
									'action' => 'history'
								],
								[ 
									'escape' => false,
									'class' => 'sidebar-link' 
								]
							)
							?>
						</li>
					</ul>
				</li>
				<li class="sidebar-item">
					<?php
					echo $this->Html->link(
						'<i class="fa fa-users"></i> <span class="hide-menu">Departments</span>',
						[
							'controller' => 'Departments',
							'action' => 'index'
						],
						[ 
							'escape' => false, 
							'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
						]
					)
					?>
				</li>
				<li class="sidebar-item">
					<?php
					echo $this->Html->link(
						'<i class="fa fa-building text-primary" aria-hidden="true"></i> <span class="hide-menu">Offices</span>',
						[
							'controller' => 'Offices',
							'action' => 'index'
						],
						[ 
							'escape' => false, 
							'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
						]
					)
					?>
				</li>
				<li class="sidebar-item">
					<?php
					echo $this->Html->link(
						'<i class="fa fa-check"></i> <span class="hide-menu">Services</span>',
						[
							'controller' => 'Services',
							'action' => 'index'
						],
						[ 
							'escape' => false, 
							'class' => 'sidebar-link waves-effect waves-dark sidebar-link has-arrow' 
						]
					)
					?>
					<ul aria-expanded="false" class="collapse  first-level">
						<li class="sidebar-item">
							<?php
							echo $this->Html->link(
								'<i class="fa fa-list" aria-hidden="true"></i> <span class="hide-menu">List</span>',
								[
									'controller' => 'Services',
									'action' => 'index'
								],
								[ 
									'escape' => false,
									'class' => 'sidebar-link' 
								]
							)
							?>
						</li>
						<li class="sidebar-item">
							<?php
							echo $this->Html->link(
								'<i class="fa fa-list" aria-hidden="true"></i> <span class="hide-menu">Service Types</span>',
								[
									'controller' => 'Categories',
									'action' => 'index'
								],
								[ 
									'escape' => false,
									'class' => 'sidebar-link' 
								]
							)
							?>
						</li>
					</ul>
				</li>
				<li class="sidebar-item">
					<?php
					echo $this->Html->link(
						'<i class="fa fa-cogs"></i> <span class="hide-menu">Technicals</span>',
						[
							'controller' => 'Technicals',
							'action' => 'index'
						],
						[ 
							'escape' => false, 
							'class' => 'sidebar-link waves-effect waves-dark sidebar-link has-arrow' 
						]
					)
					?>
					<ul aria-expanded="false" class="collapse  first-level">
						<li class="sidebar-item">
							<?php
							echo $this->Html->link(
								'<i class="fa fa-users" aria-hidden="true"></i> <span class="hide-menu">Member</span>',
								[
									'controller' => 'Technicals',
									'action' => 'index'
								],
								[ 
									'escape' => false,
									'class' => 'sidebar-link' 
								]
							)
							?>
						</li>
						<li class="sidebar-item">
							<?php
							echo $this->Html->link(
								'<i class="fa fa-list" aria-hidden="true"></i> <span class="hide-menu">Groups</span>',
								[
									'controller' => 'Techgroups',
									'action' => 'index'
								],
								[ 
									'escape' => false,
									'class' => 'sidebar-link' 
								]
							)
							?>
						</li>
					</ul>
				</li>
				<?php } ?>
				<?php if ($userRole == 4) { ?>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-dashboard"></i> <span class="hide-menu">Dashboard</span>',
								[
									'controller' => 'Tickets',
									'action' => 'dashboard'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-ticket"></i> <span class="hide-menu">Request</span>',
								[
									'controller' => 'Tickets',
									'action' => 'add'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link has-arrow' 
								]
							)
						?>
						<ul aria-expanded="false" class="collapse  first-level">
							<li class="sidebar-item">
								<?php
								echo $this->Html->link(
									'<i class="fa fa-plus" aria-hidden="true"></i> <span class="hide-menu">Add New</span>',
									[
										'controller' => 'Tickets',
										'action' => 'add'
									],
									[ 
										'escape' => false,
										'class' => 'sidebar-link' 
									]
								)
								?>
							</li>
							<li class="sidebar-item">
								<?php
								echo $this->Html->link(
									'<i class="fa fa-list-alt" aria-hidden="true"></i> <span class="hide-menu">List</span>',
									[
										'controller' => 'Tickets',
										'action' => 'index'
									],
									[ 
										'escape' => false,
										'class' => 'sidebar-link' 
									]
								)
								?>
							</li>
							<li class="sidebar-item">
								<?php
									echo $this->Html->link(
										'<i class="fa fa-undo"></i> <span class="hide-menu">History</span>',
										[
											'controller' => 'Tickets',
											'action' => 'history'
										],
										[ 
											'escape' => false, 
											'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
										]
									)
								?>
							</li>
						</ul>
					</li>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-question"></i> <span class="hide-menu">FAQS</span>',
								[
									'controller' => 'Faqs',
									'action' => 'add'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
					<!-- <li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-bell"></i> <span class="hide-menu">Notification</span>',
								[
									'controller' => 'Faqs',
									'action' => 'add'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li> -->
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-user"></i> <span class="hide-menu">User Profile</span>',
								[
									'controller' => 'Tickets',
									'action' => 'updateprofile',
									$sess_user_id
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-sign-out"></i> <span class="hide-menu">Logout</span>',
								[
									'controller' => 'Users',
									'action' => 'logout'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
				<?php } ?>
				<?php if ($userRole == 2 || $userRole == 3) { ?>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-dashboard"></i> <span class="hide-menu">Dashboard</span>',
								[
									'controller' => 'Tickets',
									'action' => 'providerdashboard'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-ticket"></i> <span class="hide-menu">Request</span>',
								[
									'controller' => 'Tickets',
									'action' => 'add'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link has-arrow' 
								]
							)
						?>
						<ul aria-expanded="false" class="collapse  first-level">
							<li class="sidebar-item">
								<?php
								echo $this->Html->link(
									'<i class="fa fa-plus" aria-hidden="true"></i> <span class="hide-menu">Add New</span>',
									[
										'controller' => 'Tickets',
										'action' => 'add'
									],
									[ 
										'escape' => false,
										'class' => 'sidebar-link' 
									]
								)
								?>
							</li>
							<li class="sidebar-item">
								<?php
								echo $this->Html->link(
									'<i class="fa fa-list-alt" aria-hidden="true"></i> <span class="hide-menu">List</span>',
									[
										'controller' => 'Tickets',
										'action' => 'index'
									],
									[ 
										'escape' => false,
										'class' => 'sidebar-link' 
									]
								)
								?>
							</li>
							<li class="sidebar-item">
								<?php
									echo $this->Html->link(
										'<i class="fa fa-undo"></i> <span class="hide-menu">History</span>',
										[
											'controller' => 'Tickets',
											'action' => 'history'
										],
										[ 
											'escape' => false, 
											'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
										]
									)
								?>
							</li>
						</ul>
					</li>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-question"></i> <span class="hide-menu">FAQS</span>',
								[
									'controller' => 'Faqs',
									'action' => 'add'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
					<!-- <li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-bell"></i> <span class="hide-menu">Notification</span>',
								[
									'controller' => 'Faqs',
									'action' => 'add'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li> -->
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-user"></i> <span class="hide-menu">User Profile</span>',
								[
									'controller' => 'Tickets',
									'action' => 'updateprofile',
									$sess_user_id
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
					<li class="sidebar-item">
						<?php
							echo $this->Html->link(
								'<i class="fa fa-sign-out"></i> <span class="hide-menu">Logout</span>',
								[
									'controller' => 'Users',
									'action' => 'logout'
								],
								[ 
									'escape' => false, 
									'class' => 'sidebar-link waves-effect waves-dark sidebar-link' 
								]
							)
						?>
					</li>
				<?php } ?>
			</ul>
		</nav>
		<!-- End Sidebar navigation -->
	</div>
	<!-- End Sidebar scroll-->
</aside>
<!-- ============================================================== -->
<!-- End Left Sidebar - style you can find in sidebar.scss  -->
<!-- ==============================================================