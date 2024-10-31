<?php
add_action( 'admin_init', 'revenueflex_settings_updateUserSettingsPage' );
function revenueflex_settings_updateUserSettingsPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'updateUserSettingsPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
}
 
function revenueflex_updateUserSettingsPage() { 
	$pageNameMain = 'updateUserSettingsPage'; ?>
		<div class="container py-3">
			<div class="row">
				<div class="col-12 text-center">
				<?php revenueflex_get_top_section(); ?>
				</div>
				<div class="col-12">
					<form method='post' id="<?php echo esc_attr($pageNameMain); ?>" class="d-table mx-auto my-3 revenueflex-form">
					<table class="form-table" role="presentation">
						<tbody>
							<tr>
								<th>
									<h4><?php esc_html_e("User Info","revenueflex"); ?>
								</th>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Email', 'revenueflex'); ?></th>
								<td>
									<input type="text" id="email" name="email" placeholder='<?php esc_attr_e('Email (Required)', 'revenueflex'); ?>'>
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Company Name', 'revenueflex'); ?></th>
								<td>
									<input type="text" id="company-name" name="company-name" placeholder='<?php esc_attr_e('Company Name', 'revenueflex'); ?>'>
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Full Name', 'revenueflex'); ?></th>
								<td>
									<input type="text" id="full-name" name="full-name" placeholder='<?php esc_attr_e('Full Name (Required)', 'revenueflex'); ?>'>
								</td>
							</tr>
							<tr>
								<th>
									<h4><?php esc_html_e("Invoice Info","revenueflex"); ?>
								</th>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Business Account', 'revenueflex'); ?></th>
								<td>
									<input class="w-auto" type="checkbox" id="business" name="business">
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Name on Invoice', 'revenueflex'); ?></th>
								<td>
								<input type="text" id="name-on-invoice" name="name-on-invoice" placeholder='<?php esc_attr_e('Name on Invoice (Required)', 'revenueflex'); ?>'>
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Address Line 1', 'revenueflex'); ?></th>
								<td>
									<input type="text" id="address-line-1" name="address-line-1" maxlength="35" placeholder='<?php esc_attr_e('Address Line 1 (Required)', 'revenueflex'); ?>'>
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Address Line 2', 'revenueflex'); ?></th>
								<td>
									<input type="text" id="address-line-2" name="address-line-2" maxlength="35" placeholder='<?php esc_attr_e('Address Line 2', 'revenueflex'); ?>'>
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('City', 'revenueflex'); ?></th>
								<td>
								<input type="text" id="city" name="city" placeholder='<?php esc_attr_e('City (Required)', 'revenueflex'); ?>'>
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Post Code', 'revenueflex'); ?></th>
								<td>
								<input type="text" id="postcode" name="postcode" placeholder='<?php esc_attr_e('Post Code', 'revenueflex'); ?>'>
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Country', 'revenueflex'); ?></th>
								<td>
									<select id="countries" name="countries">
										<option value="0" selected disabled>Select</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e('Vat Number', 'revenueflex'); ?></th>
								<td>
								<input type="text" id="vatnumber" name="vatnumber" placeholder='<?php esc_attr_e('Vat Number', 'revenueflex'); ?>'>
								</td>
							</tr>
							<input type="hidden" id="id" name="id">
							<input type="hidden" id="userId" name="userId">
						</tbody>
					</table>	
					<?php settings_fields( $pageNameMain ); do_settings_sections( $pageNameMain ); ?>
					<div class="d-flex justify-content-between">
						<a class="button button-back" href="<?php echo esc_url(revenueflex_generategoPage('userSettingsPage')); ?>"><?php esc_html_e('Cancel','revenueflex'); ?></a>
						<button type="submit" id="submit" class="button button-primary"><?php esc_html_e('Save','revenueflex'); ?></button>
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