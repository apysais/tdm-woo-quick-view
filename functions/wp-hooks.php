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
