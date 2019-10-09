<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! function_exists( 'wqv_quickview_before_item' ) ) {

    function wqv_quickview_before_item() { ?>
      <div class="quick-view-container">
        <button type="button" class="close close-quick-view hidden" aria-label="Close"><span class="close-button" aria-hidden="true">&times;</span></button>
    <?php }
}
add_action( 'woocommerce_before_shop_loop_item', 'wqv_quickview_before_item', 10);

if ( ! function_exists( 'wqv_quickview_after_item' ) ) {
    function wqv_quickview_after_item() {
        global $product;

				$see_more = get_field('detail_page', $product->get_id());

        if($see_more && $see_more == 1) { ?>
          <div class="more-details-container">
            <a href="<?php echo get_permalink( $product->get_id() );?>">More details</a>
          </div>
        <?php } ?>
          <div class="quick-view-link-container">
            Quick view
          </div>

      </div>
    <?php }
}
add_action( 'woocommerce_after_shop_loop_item', 'wqv_quickview_after_item', 10);

add_action( 'wcqv_product_summary', 'woocommerce_template_single_price', 15 );
add_action( 'wcqv_product_summary', 'woocommerce_template_single_add_to_cart', 25 );
