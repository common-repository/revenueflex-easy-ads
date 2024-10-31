<?php
add_action( 'admin_init', 'revenueflex_settings_userSettingsPage' );
function revenueflex_settings_userSettingsPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'userSettingsPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
}
 
function revenueflex_userSettingsPage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'userSettingsPage'; ?>
		<div class="container py-3">
			<div class="row w-100">
				<div class="col-12 text-center">
					<?php revenueflex_get_top_section(); 
					revenueflex_get_top_email_section();?>
				</div>
				<div class="container py-3 revenueflex-container">
					<h4><?php esc_html_e('User Information','revenueflex'); ?></h4>
					<ul class="list-style-none px-0" id="userSettingsInfoList">
						<li><?php esc_html_e("Email Address","revenueflex"); ?>: <span id="email-address"></span></li>
						<li><?php esc_html_e("Company Name","revenueflex"); ?>: <span id="company-name"></span></li>
						<li><?php esc_html_e("Full Name","revenueflex"); ?>: <span id="full-name"></span></li>
					</ul>
					<div class="d-flex">
						<a href="<?php echo esc_url(revenueflex_generategoPage('dashboardPage')); ?>" class="mx-3 button button-primary"><?php esc_html_e("Cancel","revenueflex"); ?></a>
						<a href="<?php echo esc_url(revenueflex_generategoPage('updateEmailPage')); ?>" class="mx-3 button button-primary"><?php esc_html_e("Change email address","revenueflex"); ?></a>
						<a href="<?php echo esc_url(revenueflex_generategoPage('updateUserSettingsPage')); ?>" class="mx-3 button button-primary"><?php esc_html_e("Update user info","revenueflex"); ?></a>
						<a id="deleteAccount" href="<?php echo esc_url(revenueflex_generategoPage('deleteAccountPage')); ?>" class="mx-3 button button-primary"><?php esc_html_e("Close my account","revenueflex"); ?></a>
					</div>
				</div>
				<div class="col-12 text-center">
					<?php revenueflex_get_bottom_section(); ?>
				</div>
			</div>
		</div>
		<?php
}