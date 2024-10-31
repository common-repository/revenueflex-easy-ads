<?php
add_action( 'admin_init', 'revenueflex_settings_projectSelectCreatePage' );
function revenueflex_settings_projectSelectCreatePage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'projectSelectCreatePage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
	add_settings_section(
		$sectionName, 
		esc_html__( 'Create New Project', 'revenueflex' ), 
		'revenueflex_settings_section_callback', 
		$pageNameMain
	);

	add_settings_field( 
		'revenueflex_project_name', 
		esc_html__( 'Project Name', 'revenueflex' ), 
		'revenueflex_text_render', 
		$pageNameMain, 
        $sectionName,
        [
			'placeholder' => esc_attr__( 'Project Name', 'revenueflex' ),
			'name' => $preSettingsRevenueflex.$pageName.'[revenueflex_project_name]',
			'value' => 'revenueflex_project_name',
			'pageName' => $pageName,
			'id' => 'project-name'
		]  
	);

}
 
function revenueflex_projectSelectCreatePage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'projectSelectCreatePage'; ?>
		<div class="container py-3 revenueflex-container">
			<div class="row">
				<div class="col-12 text-center my-3"><?php revenueflex_get_top_section(); ?></div>
				<div class="row my-3">
					<div class="col-lg-12 my-2">
						<form action='options.php' method='post' id="<?php echo esc_attr($pageNameMain); ?>" class="revenueflex-form">
							<?php settings_fields( $pageNameMain );
							do_settings_sections( $pageNameMain );?>
							<div class="d-flex justify-content-between revenueflex-footer-buttons">
							<a class="button button-back" href="<?php echo esc_url(revenueflex_generategoMainPage('startPage')); ?>"><?php esc_html_e('Cancel','revenueflex'); ?></a>
							<input type="submit" name="submit" id="submit" class="button button-primary" value="<?php esc_html_e('Create Project', 'revenueflex'); ?>">
							</div>
						</form>
					</div>
					</div>
					<div class="row my-3 projectList">
					<div class="col-lg-12 my-2" id="project-list">
						<h2><?php esc_html_e("Select Project","revenueflex"); ?></h2>
						<ul class="px-0" id="projectList"></ul>
					</div>
				</div>
				<div class="col-12 text-center">
					<?php revenueflex_get_bottom_section(); ?>
				</div>
			</div>
		</div>
		<?php
}