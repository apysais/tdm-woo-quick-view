<section class="shopping-block product-<?php echo $product_id;?>" >
    <?php global $woocommerce; ?>
    <script>
      var wc_add_to_cart_variation_params = {"ajax_url":"\/wp-admin\/admin-ajax.php"};
      jQuery.getScript("<?php echo $woocommerce->plugin_url(); ?>/assets/js/frontend/add-to-cart-variation.min.js");
    </script>

    <?php do_action('wqv_before_loop'); ?>

    <?php while ( have_posts() ) : the_post(); ?>

      <?php do_action('wqv_start_in_loop', get_the_ID()); ?>

      <?php do_action('wqv_before_product_container_in_loop', get_the_ID()); ?>

      <div class="product">

        <?php do_action('wqv_before_product_item_in_loop', get_the_ID()); ?>

        <div id="product-<?php the_ID(); ?>" <?php post_class('product'); ?>>

            <?php do_action('wqv_after_product_item_in_loop', get_the_ID()); ?>

            <div class="summary entry-summary scrollable">

              <?php do_action('wqv_before_summary_content_item_in_loop', get_the_ID()); ?>

              <div class="summary-content summary-content-product-<?php echo get_the_ID();?>">
                   <?php do_action( 'wcqv_product_summary' ); ?>
              </div>

              <?php do_action('wqv_after_summary_content_item_in_loop', get_the_ID()); ?>

            </div>
        </div>
      </div>
      
      <?php do_action('wqv_after_product_container_in_loop', get_the_ID()); ?>

    <?php endwhile; //end of the loop.?>

    <?php do_action('wqv_after_loop'); ?>

</section>
