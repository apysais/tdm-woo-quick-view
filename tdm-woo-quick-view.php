<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://thedigitalmarketers.com.au/
 * @since             1.0.0
 * @package           Tdm_Woo_Quick_View
 *
 * @wordpress-plugin
 * Plugin Name:       TDM WOO Quick View
 * Plugin URI:        https://thedigitalmarketers.com.au/
 * Description:       Add a quick view on woocommerce product.
 * Version:           1.0.0
 * Author:            thedigitalmarketers
 * Author URI:        https://thedigitalmarketers.com.au/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       tdm-woo-quick-view
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'TDM_WOO_QUICK_VIEW_VERSION', '1.0.0' );

/**
 * For autoloading classes
 * */
spl_autoload_register('wqv_directory_autoload_class');
function wqv_directory_autoload_class($class_name){
		if ( false !== strpos( $class_name, 'WQV' ) ) {
	 $include_classes_dir = realpath( get_template_directory( __FILE__ ) ) . DIRECTORY_SEPARATOR;
	 $admin_classes_dir = realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR;
	 $class_file = str_replace( '_', DIRECTORY_SEPARATOR, $class_name ) . '.php';
	 if( file_exists($include_classes_dir . $class_file) ){
		 require_once $include_classes_dir . $class_file;
	 }
	 if( file_exists($admin_classes_dir . $class_file) ){
		 require_once $admin_classes_dir . $class_file;
	 }
 }
}
function wqv_get_plugin_details(){
 // Check if get_plugins() function exists. This is required on the front end of the
 // site, since it is in a file that is normally only loaded in the admin.
 if ( ! function_exists( 'get_plugins' ) ) {
	 require_once ABSPATH . 'wp-admin/includes/plugin.php';
 }
 $ret = get_plugins();
 return $ret['tdm-woo-quick-view/tdm-woo-quick-view.php'];
}
function wqv_get_text_domain(){
 $ret = wqv_get_plugin_details();
 return $ret['TextDomain'];
}
function wqv_get_plugin_dir(){
 return plugin_dir_path( __FILE__ );
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-tdm-woo-quick-view-activator.php
 */
function activate_tdm_woo_quick_view() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-tdm-woo-quick-view-activator.php';
	Tdm_Woo_Quick_View_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-tdm-woo-quick-view-deactivator.php
 */
function deactivate_tdm_woo_quick_view() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-tdm-woo-quick-view-deactivator.php';
	Tdm_Woo_Quick_View_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_tdm_woo_quick_view' );
register_deactivation_hook( __FILE__, 'deactivate_tdm_woo_quick_view' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-tdm-woo-quick-view.php';
require plugin_dir_path( __FILE__ ) . 'functions/wp-hooks.php';
require plugin_dir_path( __FILE__ ) . 'functions/woo.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_tdm_woo_quick_view() {

	$plugin = new Tdm_Woo_Quick_View();
	$plugin->run();

	WQV_Ajax::get_instance();

}
add_action('plugins_loaded', 'run_tdm_woo_quick_view');
