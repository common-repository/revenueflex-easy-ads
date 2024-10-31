<?php
add_action( 'admin_init', 'revenueflex_settings_validateKeyPage' );
function revenueflex_settings_validateKeyPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'validateKeyPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
	add_settings_section(
		$sectionName, 
		esc_html__( 'Validate Your Api Key', 'revenueflex' ), 
		'revenueflex_settings_section_callback', 
		$pageNameMain
	);

	add_settings_field( 
		'revenueflex_api_key', 
		esc_html__( 'Your API Key', 'revenueflex' ), 
		'revenueflex_text_render', 
		$pageNameMain, 
        $sectionName,
        [
			'placeholder' => esc_attr__( 'Your API Key', 'revenueflex' ),
			'name' => $preSettingsRevenueflex.$pageName.'[revenueflex_api_key]',
			'value' => 'revenueflex_api_key',
			'pageName' => $pageName,
			'id' => 'revenueflex-api-key',
			'text_before'=> esc_attr__('Check your mailbox and copy api key below.','revenueflex')
		]  
	);

	// add_settings_field( 
	// 	'revenueflex_adsense_publisher_id', 
	// 	esc_html__( 'Adsense Publisher ID', 'revenueflex' ), 
	// 	'revenueflex_text_render', 
	// 	$pageNameMain, 
    //     $sectionName,
    //     [
	// 		'placeholder' => esc_attr__( 'pub-XXXXXXXXXX', 'revenueflex' ),
	// 		'name' => $preSettingsRevenueflex.$pageName.'[revenueflex_adsense_publisher_id]',
	// 		'value' => 'revenueflex_adsense_publisher_id',
	// 		'pageName' => $pageName,
	// 		'id' => 'revenueflex-adsense-publisher-id',
	// 		'text_before'=> esc_attr__('You can find your publisher id by going to "Account > Account info" on your adsense account.','revenueflex')
	// 	]  
	// );

	// add_settings_field( 
	// 	'revenueflex_adsense_slot_id', 
	// 	esc_html__( 'Adsense Slot ID', 'revenueflex' ), 
	// 	'revenueflex_text_render', 
	// 	$pageNameMain, 
    //     $sectionName,
    //     [
	// 		'placeholder' => esc_attr__( 'Adsense ad unit id', 'revenueflex' ),
	// 		'name' => $preSettingsRevenueflex.$pageName.'[revenueflex_adsense_slot_id]',
	// 		'value' => 'revenueflex_adsense_slot_id',
	// 		'pageName' => $pageName,
	// 		'id' => 'revenueflex-adsense-slot-id',
	// 		'text_before'=> esc_attr__('If you would like to track Revenueflex revenue seperately please create an ad placement on your adsense account and enter slot id here.','revenueflex')
	// 	]  
	// );

}
 
function revenueflex_validateKeyPage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'validateKeyPage'; ?>
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
						<div class="d-flex justify-content-between">
							<a class="button button-back" href="<?php echo esc_url(revenueflex_generategoMainPage('startPage')); ?>"><?php esc_html_e('Cancel and use another email address','revenueflex'); ?></a>
							<input type="submit" name="submit" id="submit" class="button button-primary" value="<?php esc_attr_e('Continue', 'revenueflex'); ?>">
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