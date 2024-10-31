<?php
add_action( 'admin_init', 'revenueflex_settings_updateEmailValidateKeyPage' );
function revenueflex_settings_updateEmailValidateKeyPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'updateEmailValidateKeyPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
}
 
function revenueflex_updateEmailValidateKeyPage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'updateEmailValidateKeyPage'; ?>
		<div class="container py-3">
			<div class="row">
				<div class="col-12 text-center">
				<?php revenueflex_get_top_section(); ?>
				</div>
				<div class="col-12">
					<form action='options.php' method='post' id="<?php echo esc_attr($pageNameMain); ?>" class="d-table mx-auto my-3 revenueflex-form">
						<?php
						settings_fields( $pageNameMain );
						do_settings_sections( $pageNameMain ); ?>
						<h4><?php esc_html_e("Check your mail box","revenueflex"); ?>
						<p><?php esc_html_e("Copy and paste here new API key here from","revenueflex"); ?> <?php echo esc_html(rawurldecode($_GET['email'])); ?></p>
						<table class="form-table" role="presentation">
							<tbody>
								<tr>
									<th scope="row"><?php esc_html_e('API Key', 'revenueflex'); ?></th>
									<td>
										<input type="text" id="new-apikey" name="new-apikey" placeholder='<?php esc_html_e('API Key', 'revenueflex'); ?>'>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="d-flex justify-content-between">
							<a class="button button-back" href="<?php echo esc_url(revenueflex_generategoPage('dashboardPage')); ?>"><?php esc_html_e('Cancel','revenueflex'); ?></a>
							<input type="submit" name="submit" id="submit" class="button button-primary" value="<?php esc_html_e('Continue', 'revenueflex'); ?>">
						</div>
					</form>
				</div>
				<div class="col-12 text-center">
					<?php revenueflex_get_bottom_section(); ?>
				</div>
			</div>
		</div>
		<?php
}
add_action( 'current_screen', 'revenueflex_updateEmailValidateKeyPage_before' );
function revenueflex_updateEmailValidateKeyPage_before(){
	$my_current_screen = get_current_screen();
	if($my_current_screen->base == 'revenueflex_page_revenueflex-updateEmailValidateKeyPage') {
		if(!$_GET['email']) {
			revenueflex_goPage('updateEmailPage');
		}
	}
}