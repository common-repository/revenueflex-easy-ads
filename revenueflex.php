<?php
/**
 * Plugin Name:       Auto Ad Inserter
 * Plugin URI:        https://www.revenueflex.com/auto-ad-inserter
 * Description:       Unlock your website's revenue potential with a data-driven approach. With our state-of-the-art technology, you can take advantage of artificial intelligence for more ad revenue and a better overall user experience.
 * Version:           1.5
 * Requires at least: 4.0
 * Requires PHP:      5.6
 * Author:            revenueflex
 * Author URI:        https://www.revenueflex.com/
 * License:           GPL v2 or later
 * License URL:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       revenueflex
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

global $plugin_dir_uri_revenueFlex; $plugin_dir_uri_revenueFlex = plugin_dir_url( __FILE__ );
global $plugin_dir_path;  $plugin_dir_path = plugin_dir_path( __FILE__ );

load_plugin_textdomain( 'revenueflex', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

include ($plugin_dir_path.'inc.php');

/**
 * Activate the plugin.
 */
function revenueflex_activate() { 
    revenueflex_setup_init(); 
}
function revenueflex_setup_init() {
    update_option( 'revenueflex_api', '' );
    // do_action('rf_cron');
}  
register_activation_hook( __FILE__, 'revenueflex_activate' );

function revenueflex_deactivated() { 
    
}
register_deactivation_hook( __FILE__, 'revenueflex_deactivated' );

include ($plugin_dir_path.'inc/initPages.php');
include ($plugin_dir_path.'inc/helpers.php');
include ($plugin_dir_path.'pages/startPage.php');
foreach($revenueflex_pages as $pageRevenueflex) {
    include ($plugin_dir_path.'pages/'.$pageRevenueflex['id'].'.php');
}