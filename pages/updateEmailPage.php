<?php
add_action( 'admin_init', 'revenueflex_settings_updateEmailPage' );
function revenueflex_settings_updateEmailPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'updateEmailPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
}
 
function revenueflex_updateEmailPage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'updateEmailPage'; ?>
		<div class="container py-3 revenueflex-container">
			<div class="row">
				<div class="col-12 text-center">
					<?php revenueflex_get_top_section(); ?>
					<!-- <div class="alert alert-danger" role="alert">
						<form action="options.php" method="post" id="revenueflex-top-email-form" class="d-table mx-auto my-3 revenueflex-form" >
							<div class="revenueflex-email-div" style="font-size:18px">
								You should enter your email address for better support.
								<input type="text" id="revenueflex-user-email" name="user-email" class="col-3" placeholder="Email" style="margin-left: 20px;font-size:20px" />
								<input type="submit" name="submit" id="submit" class="button button-primary" value="Save Email" style="margin-left: 20px" />
							</div>
						</form>
					</div> -->
				<div class="container py-3 revenueflex-container">
				</div>
				<div class="col-12">
					<form action='options.php' method='post' id="<?php echo esc_attr($pageNameMain); ?>" class="d-table mx-auto my-3 revenueflex-form">
						<?php
						settings_fields( $pageNameMain );
						do_settings_sections( $pageNameMain ); ?>
						<h4><?php esc_html_e("Change your email address","revenueflex"); ?>
						<table class="form-table" role="presentation">
							<tbody>
								<tr>
									<th scope="row"><?php esc_html_e('New email address', 'revenueflex'); ?></th>
									<td>
										<input type="text" id="revenueflex-new-mail-address" name="new-email" placeholder='<?php esc_html_e('New email address', 'revenueflex'); ?>'>
									</td>
								</tr>
							</tbody>
						</table>	
						<div class="d-flex justify-content-between">
							<a class="button button-back" href="<?php echo esc_url(revenueflex_generategoPage('userSettingsPage')); ?>"><?php esc_html_e('Cancel','revenueflex'); ?></a>
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