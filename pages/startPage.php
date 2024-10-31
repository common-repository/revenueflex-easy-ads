<?php

add_action( 'current_screen', 'revenueflex_startPage_before' );
function revenueflex_startPage_before(){
	$my_current_screen = get_current_screen();
	if($my_current_screen->base == 'toplevel_page_startPage') {
		revenueflex_checkStartPage();
	}
}


function revenueflex_startPage() { 
	?>
	<div class="container py-3 revenueflex-container">
		<div class="row">
			<div class="col-12 text-center">
			<?php revenueflex_get_top_section(); ?>
			</div>
			<div class="col-12">
				<div>
					<h3 style="text-align:center"><?php esc_html_e('Welcome to Auto Ad Inserter', 'revenueflex'); ?></h3>
					<p><?php esc_html_e("Auto Ad Inserter is a simple and effective wordpress plugin to increase your ads' profit the best way.
You can easily inject ads into your any web page, also you can choose ad locations and many options from Project Settings page.
Click to Continue to get started!", "revenueflex"); ?></p>
					<p><?php _e('If you require any further information, feel free to <a href="https://www.revenueflex.com/#contact" target="_blank">contact us</a>.', 'revenueflex'); ?></p>
				</div>	
				<br>
				<div class="d-flex justify-content-center flex-wrap">
					<button id="continue" name="continue" class="mx-3 button button-primary"><?php esc_html_e("Continue","revenueflex"); ?></button>
				</div>
			
			<div class="col-12 text-center">
				<?php revenueflex_get_bottom_section(); ?>
			</div>
		</div>
	</div>
	<?php
}

function revenueflex_checkStartPage() {
	global $preSettingsRevenueflex;
	$options_startPage = revenueflex_getOption( 'startPage');
	$options_validateKeyPage = revenueflex_getOption( 'validateKeyPage');
	$options_projectSelectCreatePage = revenueflex_getOption( 'projectSelectCreatePage');

	$email = $options_startPage['revenueflex_mail_address'];
	$apikey = $options_validateKeyPage['revenueflex_api_key'];
	// $project = $options_projectSelectCreatePage['revenueflex_mail_address'];
	$project = $options_projectSelectCreatePage['revenueflex_project_id'];
	
	if ($email && $apikey && $project) {
		revenueflex_goPage('dashboardPage');
	}

	// if ($email) {	
	// 	if($apikey) {
	// 		if($project)
	// 			revenueflex_goPage('dashboardPage');			
	// 	}
	// 	else
	// 		revenueflex_goPage('validateKeyPage');
	// }

	
}