<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
/**
 * Ajax Event.
 */
class WQV_Ajax {

  /**
	 * instance of this class
	 *
	 * @since 3.12
	 * @access protected
	 * @var	null
	 * */
	protected static $instance = null;

    /**
     * use for magic setters and getter
     * we can use this when we instantiate the class
     * it holds the variable from __set
     *
     * @see function __get, function __set
     * @access protected
     * @var array
     * */
    protected $vars = array();

    /**
	 * Return an instance of this class.
	 *
	 * @since     1.0.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		/*
		 * @TODO :
		 *
		 * - Uncomment following lines if the admin class should only be available for super admins
		 */
		/* if( ! is_super_admin() ) {
			return;
		} */

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

  public function __construct()
  {
    add_action( 'wp_ajax_mru_get_product', [$this,'getProduct'] );
    add_action( 'wp_ajax_nopriv_mru_get_product', [$this,'getProduct'] );
  }

  public function getProduct()
  {
    //global $product;
    if(isset($_POST['product_id'])) {
      $product_id = $_POST['product_id'];
      //get the product info via slug
      //check if exists
      if( intval($product_id) ) {
        //get the product
        //put the product globally so we can use woo functions as it rely on $product global variable.
        //$GLOBALS['product'] = $product;
        wp( 'p=' . $product_id . '&post_type=product' );
        $see_more = get_field('detail_page', $product_id);
        //output the view
        $data['product_id'] = get_the_ID();
        WQV_View::get_instance()->public_partials('info.php', $data);
      }
    }//if isset $slug POST.
    wp_die();
  }
} // class WQV_Ajax
