<?php
add_action( 'admin_init', 'revenueflex_settings_projectSettingsPage' );
function revenueflex_settings_projectSettingsPage() { 
	global $preSettingsRevenueflex; 
	$pageNameMain = 'projectSettingsPage';
	$pageName = revenueflex_getPageName($pageNameMain);
	$sectionName = revenueflex_getSectionName($pageNameMain);
}
 
function revenueflex_projectSettingsPage() { 
	global $plugin_dir_uri_revenueFlex; $pageNameMain = 'projectSettingsPage'; ?>
		<div class="container py-3">
			<form id="adstxt_form" name="adstxt_form" method="post" action="https://panel.revenueflex.com/rest/adstxt2" >
				<!-- <input type="hidden" name="email" value="e1@abccccccccccccccc.com">
				<input type="hidden" name="apiKey" value="sbUa6y5nz5sZsvxzxnTyk8ztkFrh11jgAs4v4qcYhbl1itWmy3zdlJvk7h3cj3yd7mrY2jhvj72s14o0mNevu1cbja2r86jYz0gziu23092d1Ny9x1fujrzqi5cYcu4t3l27nfkrmaeirdsNjY2NjY2MuY29t">
				<input type="hidden" name="projectId" value="2441"> -->
			</form>
			<div class="row w-100">
				<div class="col-12 text-center">
					<?php revenueflex_get_top_section(); 
					revenueflex_get_top_email_section();?>
				</div>
				<div class="col-12">
					<form action='options.php' method='post' id="<?php echo esc_attr($pageNameMain); ?>" class="d-table mx-auto my-3 revenueflex-form">
						<?php
						settings_fields( $pageNameMain );
						do_settings_sections( $pageNameMain );
						?>
						<h4><?php _e("Project Settings","revenueflex"); ?>
						<div class="col-12 mt-4">
							<h4><?php esc_html_e('Project Domains (Add domain)','revenueflex'); ?></h4>
							<p><?php esc_html_e('Add your domains here to protect your quota. Auto Ad Inserter only works on domains listed here. Please enter only root domains without "www" or "https://"', 'revenueflex'); ?></p>
						</div>
						<div class="col-12">
							<textarea class="col-md-6" name="revenueflexWhiteListDomains" id="revenueflexWhiteListDomains"
							placeholder="<?php esc_attr_e('Enter one domain per line &#10;example.com &#10;example1.com &#10;example2.com','revenueflex'); ?>"></textarea>
						</div>
						<table class="form-table" role="presentation">
							<tbody>
								<tr>
									<th scope="row"><?php esc_html_e('RevenueFlex Enabled', 'revenueflex'); ?></th>
									<td>
										<input class="w-auto" type="checkbox" id="enabled" name="enabled">
									</td>
								</tr>
								<tr>
									<th scope="row"><?php esc_html_e('Monetize Unfilled Impressions', 'revenueflex'); ?></th>
									<td>
										<input class="w-auto" type="checkbox" id="monetizeUnfilledImpressions" name="monetizeUnfilledImpressions">
										<?php esc_html_e('You need to add several lines to your ads.txt file.', 'revenueflex'); ?> 
										<a href="https://panel.revenueflex.com/rest/adstxt2" onClick="document.forms['adstxt_form'].submit(); return false;"><?php esc_html_e('Click here', 'revenueflex');?></a><?php esc_html_e(' to see the lines.', 'revenueflex'); ?>
									</td>
								</tr>
								<tr>
									<th scope="row"><?php esc_html_e('Adsense Publisher ID', 'revenueflex'); ?></th>
									<td>
										<input type="text" id="adsensePublisherId" name="adsensePublisherId" placeholder='<?php esc_attr_e('Adsense Publisher ID', 'revenueflex'); ?>'>
									</td>
								</tr>
								<tr>
									<th scope="row"><?php _e('Mobile Ad Density', 'revenueflex'); ?>
									</th>
									<td>
										<?php for($i = 0; $i < 2; $i++) { ?>
											<div class="row">
												<?php $counter = 10/($i + 1); while($counter > 5-($i*5)) {   ?> 
													<div class="col-sm col-6">
														<div class="form-check px-0">
															<input class="form-check-input d-none" type="radio" name="mobileAdDensity" id="mobileAdDensity<?php echo esc_attr($counter); ?>" value="<?php echo esc_attr($counter); ?>">
																<label class="form-check-label d-block" for="mobileAdDensity<?php echo esc_attr($counter); ?>">
																	<p class="text-center d-block"><?php echo esc_attr($counter); ?><p>
																	<img src="<?php echo esc_url($plugin_dir_uri_revenueFlex); ?>/assets/images/ad-density/mobile-ad-density-<?php echo esc_attr($counter); ?>.svg" class="img-fluid">
																</label>
														</div>
													</div>
												<?php $counter--; } ?>
											</div>
										<?php  } ?>
									</td>
								</tr>
								<tr>
									<th scope="row"><?php esc_html_e('Desktop Ad Density', 'revenueflex'); ?></th>
									<td>
										<?php for($i = 0; $i < 2; $i++) { ?>
											<div class="row">
												<?php $counter = 10/($i + 1); while($counter > 5-($i*5)) {   ?> 
													<div class="col-sm col-6">
														<div class="form-check  px-0">
															<input class="form-check-input d-none" type="radio" name="desktopAdDensity" id="desktopAdDensity<?php echo esc_attr($counter); ?>" value="<?php echo esc_attr($counter); ?>">
																<label class="form-check-label d-block" for="desktopAdDensity<?php echo esc_attr($counter); ?>">
																	<p class="text-center d-block"><?php echo esc_attr($counter); ?><p>
																	<img src="<?php echo esc_url($plugin_dir_uri_revenueFlex); ?>/assets/images/ad-density/desktop-ad-density-<?php echo esc_attr($counter); ?>.svg" class="img-fluid">
																</label>
														</div>
													</div>
												<?php $counter--; } ?>
											</div>
										<?php  } ?>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="col-12 mt-4">
							<h4><?php esc_html_e('Exclude Pages','revenueflex'); ?></h4>
						</div>
						<div class="col-lg-12 my-2">
							<h5><?php esc_html_e("Exact Match","revenueflex"); ?></h5>
							<p><?php esc_html_e("If you want to exclude Auto Ad Inserter from certain pages on your website enter urls below. Auto Ad Inserter will not process these pages.","revenueflex"); ?></p>
							<textarea class="w-100" name="excludePagesExact" id="excludePagesExact" placeholder="<?php esc_attr_e('Enter one url per line&#10;example.com/exampleurl1 &#10;example.com/exampleurl2 &#10;example.com/exampleurl3','revenueflex'); ?>"></textarea>
						</div> 
						<div class="col-lg-12 my-2">
							<h5><?php esc_html_e("Starts With","revenueflex"); ?></h5>
							<p><?php esc_html_e("If you want to exclude Auto Ad Inserter from a certain section on a website enter urls below. Auto Ad Inserter will not process these pages and any pages staring with the given url.","revenueflex"); ?></p>
							<p><?php esc_html_e('If you want to exclude the entire sports section on your website enter "example.com/sports" and Auto Ad Inserter will not process the page or any page starting with the given url (example.com/sports/1, example.com/sports2 etc)',"revenueflex"); ?></p>
							<textarea class="w-100" name="excludePagesStartsWith" id="excludePagesStartsWith" placeholder="<?php esc_html_e('Enter one url per line &#10;example.com/sports &#10;example.com/news','revenueflex'); ?>"></textarea>
						</div>    
						<div class="d-flex justify-content-between">
							<a class="button button-back" href="<?php echo esc_url(revenueflex_generategoPage('dashboardPage')); ?>"><?php esc_html_e('Cancel','revenueflex'); ?></a>
							<input type="submit" name="submit" id="submit" class="button button-primary" value="<?php esc_html_e('Save','revenueflex'); ?>">
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