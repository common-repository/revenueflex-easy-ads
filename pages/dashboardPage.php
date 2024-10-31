<?php
add_action( 'admin_init', 'revenueflex_settings_dashboardPage' );
function revenueflex_settings_dashboardPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'dashboardPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);

}
 
function revenueflex_dashboardPage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'dashboardPage'; ?>
	<div class="container py-3">
		<div class="row">
			<div class="col-12 text-center">
			<?php 
			revenueflex_get_top_section(); 
			revenueflex_get_top_email_section();
			?>
			</div>
			<div class="col-12" id="<?php echo esc_attr($pageNameMain); ?>">
				<div class="row my-4"></div>
			</div>
			<div class="col-12">
				<div class="d-flex justify-content-center flex-wrap">
					<!-- <a href="<?php echo esc_url(revenueflex_generategoPage('subscriptionPage')); ?>" class="mx-3 button button-primary"><?php esc_html_e("Subscription","revenueflex"); ?></a> -->
					<a href="<?php echo esc_url(revenueflex_generategoPage('projectSettingsPage')); ?>" class="mx-3 button button-primary"><?php esc_html_e("Project Settings","revenueflex"); ?></a>
					<a href="<?php echo esc_url(revenueflex_generategoPage('userSettingsPage')); ?>" class="mx-3 button button-primary"><?php esc_html_e("User Settings","revenueflex"); ?></a>
					<button id="logout" style="display:none;" class="mx-3 button button-primary"><?php esc_html_e("Logout","revenueflex"); ?></button>
				</div>
			</div>
			<div class="col-12 text-center">
				<?php revenueflex_get_bottom_section(); ?>
			</div>
		</div>
	</div>
<?php
}