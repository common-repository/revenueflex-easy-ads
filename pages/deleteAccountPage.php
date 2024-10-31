<?php
add_action( 'admin_init', 'revenueflex_settings_deleteAccountPage' );
function revenueflex_settings_deleteAccountPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'deleteAccountPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
}
 
function revenueflex_deleteAccountPage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'deleteAccountPage';
	$options = revenueflex_getOption('startPage'); ?>
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
						<h4><?php esc_html_e("Delete account","revenueflex"); ?>
						<p><?php esc_html_e("This action cannot be reversed.","revenueflex"); ?></p>
						<p><?php esc_html_e("All user and website information will be lost and can not be recovered.","revenueflex"); ?></p>
						<p><?php esc_html_e("Please write your email address to confirm.","revenueflex"); ?></p>
						<table class="form-table" role="presentation">
							<tbody>
								<tr>
									<td>
										<input type="text" id="email-address" name="email-address">
										<input type="hidden" id="email-address-validate" name="email-address-validate" value="<?php echo esc_attr($options['revenueflex_mail_address']); ?>">
									</td>
								</tr>
							</tbody>
						</table>
						<div class="d-flex justify-content-between">
							<a class="button button-back" href="<?php echo esc_url(revenueflex_generategoPage('userSettingsPage')); ?>"><?php esc_html_e('Cancel','revenueflex'); ?></a>
							<input type="submit" name="submit" id="submit" class="button button-primary" value="<?php esc_html_e('Delete Account', 'revenueflex'); ?>">
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