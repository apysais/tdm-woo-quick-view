<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

add_filter( 'body_class', 'qv_custom_class' );
function qv_custom_class( $classes ) {
    $classes[] = 'no-touchevents';
    return $classes;
}

/**
 * Set Advanced Custom Fields metabox priority.
 *
 * @param  string  $priority    The metabox priority.
 * @param  array   $field_group The field group data.
 * @return string  $priority    The metabox priority, modified.
 */
if ( !function_exists( 'wqv_set_acf_metabox_priority' ) ) :
	function wqv_set_acf_metabox_priority( $priority, $field_group ) {

		if ( 'Product Optimisation' === $field_group['title'] ) {
			$priority = 'high';
		}
		return $priority;

	}
	add_filter( 'acf/input/meta_box_priority', 'wqv_set_acf_metabox_priority', 10, 2 );
endif;
