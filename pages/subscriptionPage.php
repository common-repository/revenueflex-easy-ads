<?php
add_action( 'admin_init', 'revenueflex_settings_subscriptionPage' );
function revenueflex_settings_subscriptionPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'subscriptionPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
}
 
function revenueflex_subscriptionPage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'subscriptionPage'; ?>
		<div class="container py-3">
			<div class="row">
				<div class="col-12 text-center">
					<?php revenueflex_get_top_section();
					revenueflex_get_top_email_section(); ?>
				</div>
				<div class="container my-3 revenueflex-container" id="<?php echo esc_attr($pageNameMain); ?>">
					<h4><?php esc_html_e("Your Current Subscription","revenueflex"); ?></h4>
					<div id="revenueflex-current-package" class="row"></div>
					<div class="package-selection">
						<div id="revenueflex-subscription-info">
							<h4><?php esc_html_e("Select your subscription","revenueflex"); ?></h4>
							<div id="revenueflex-packages-list" class="row"></div>
						</div>
					</div>
					<div class="col-md-12 my-3">
					<a class="button button-back" href="<?php echo esc_url(revenueflex_generategoPage('dashboardPage')); ?>"><?php esc_html_e('Cancel','revenueflex'); ?></a>
				</div>
				</div>
			
				<div class="col-12 text-center">
					<?php revenueflex_get_bottom_section(); ?>
				</div>
			</div>
		</div>
		<?php
}