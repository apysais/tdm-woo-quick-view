(function( $ ) {
	'use strict';

	 var quickview = function(){
 		return {
 			init:function(){
 				//get the main element
 				var _li_product = $('li.product');
 				var _li_container = 'mru-quickview-product-ajax-info';
 				var _li_sel_container = '.' + _li_container;
 				var _qv_sel_placeholder = '.quick-view-placeholder';
                 var previousScrollY = 0;

 				/**
 				* Append the parent li to display this data.
 				**/
 				function append_info(_container, _data)
 				{

 					var info = '<div class="'+_li_container+'">'+_data+'</div>';
 					_container.find('.quick-view').append(info);

 				}

 				/**
 				* create an empty LI beside the clicked LI.
 				**/
 				function create_after_li(_container, _data)
 				{
					var $container_open = '';
					var $container_close = '';
 					//set the container with the data
 					$container_open = '<li class="type-product product status-publish has-post-thumbnail product_cat-adventure-full-face instock purchasable product-type-variable has-default-attributes quick-view-placeholder">';
 					$container_close = '</li>';
 					_container.after($container_open + _data + $container_close);
 				}

 				/**
 				* get the current slug clicked
 				* we use this to pass on ajax to get the data by slug
 				* @param _this | object | pass the object that is currently clicked
 				* @return string | the end point url of the product
 				**/
 				function mru_get_slug(_this)
 				{
 					var url = _this.find('a').attr("href");
 					//set slug url
 					var slug_url = '';
 					//split the url
 					//@see var url
 					var pathArray = url.split('/');
 					//get the length of the url
 					var len_arr = (pathArray.length - 1);
 					//get the last end point
 					if(pathArray[len_arr] === ''){
 						slug_url = pathArray[len_arr - 1];
 					}else{
 						slug_url = pathArray[len_arr];
 					}

 					return slug_url;
 				}

 				/**
 				* Alert the user if didnt choose any variations.
 				**/
 				function mru_qv_single_add_to_cart_button()
 				{
 					$('.single_add_to_cart_button').on('click', function(e){

 						var variations_form = $('.cart');

 						if(variations_form.find('select').val() === ''){
 							e.preventDefault();
 							alert('Please select some product options before adding this product to your cart.');
 						}else{
 							return true;
 						}
 					});
 				}

 				/**
 				* Reset the current selected variations.
 				**/
 				function mru_qv_reset_variations()
 				{
 					$('.reset_variations').on('click', function(e){
 						e.preventDefault();
 						var variations_form = $('.cart');
 						variations_form.find('select').val('');
 					});
 				}

 				/**
 				* remove all opened quick-view class.
 				* @param _this | object | pass the object that is currently clicked
 				**/
 				function mru_qv_remove_class(_this)
 				{
 					_this.removeClass('quick-view-open');
 					_this.parent().find('.quick-view-container').removeClass('quick-view');
 				//	$("ul.products li").not('.quick-view').removeClass('quick-view-active');
 					$("ul.products li, .content-area > a, #secondary, #breadcrumbs, .woocommerce-products-header, #main-navigation, #upsell-banner-middle, ul.products > a, .ajax-nav, .taxonomy-product-cat-footer, #masthead, #footer-top, #footer-bottom").removeClass('quick-view-active');

 				}

 				/**
 				* add quick-view class on the current clicked li.
 				* @param _this | object | pass the object that is currently clicked
 				**/
 				function mru_qv_add_class(_this)
 				{
 					_this.removeClass('quick-view-loading').addClass('quick-view-open');
 					_this.find('.quick-view-container').addClass('quick-view');
 					$("ul.products li").not('.quick-view-open').addClass('quick-view-active');
 					$(".content-area > a, #secondary, #breadcrumbs, .woocommerce-products-header, #main-navigation, #upsell-banner-middle, ul.products > a, .ajax-nav, .taxonomy-product-cat-footer, #masthead, #footer-top, #footer-bottom").addClass('quick-view-active');

 				}

 				/**
 				* add quick-view-loading class on the current clicked li.
 				* @param _this | object | pass the object that is currently clicked
 				**/
 				function mru_qv_add_loading_class(_this)
 				{
 					_this.addClass('quick-view-loading');
 					_this.append('<div class="loading"><i class="fas fa-spinner fa-spin"></i></div>');
 				}


 				/**
 				* initialize the close button using clicked event.
 				* @param _this | object | pass the object that is currently clicked
 				**/
 				function mru_qv_close(_this)
 				{
 					_this.find('.close-quick-view').removeClass('hidden');
 					//close-quick-view
 					$('body').on('click', '.close-quick-view, .close-quick-view span, .quick-view-open, #background_cover', function(e){
 					    var target = $( e.target );
							if (
 	    				    target.is( "li" )
 	    				    || target.is( "#background_cover" )
 	    				    || target.is( "span.close-button" )
 	    				    || target.is( "button.close" )

 	    				){
     						e.preventDefault();
     						mru_qv_destroy(_this);
 	    					_this.find('.close-quick-view').addClass('hidden');
 	    				} else {
 	    				    return true;
 	    				}
 					});
 				}

 				/**
 				* destroy the popop quick view.
 				* @param _this | object
 				**/
 				function mru_qv_destroy(_this)
 				{
 					//show the current parent li
 			//		$(this).addClass('hidden');


 					//removed all open quick view
 					_this.parent().find(_qv_sel_placeholder).remove();

 				    _this.parent().find('.quick-view').removeClass("show").css({
 						'left':'',
 					});

 					//remove the quick-view class on the current li
 					mru_qv_remove_class(_this);

                     // remove the size-chart modal which has been moved out of the LI block
         	        $(".product-chart-modal").remove();

 					//put back the product class
 					qv_toggle_woo_class(_this, 'add');
 					$("#background_cover").remove();

 					//remove the current quick-view information
 					_this.find(_li_sel_container).remove();

 					$('body').css('overflow','auto')
             		$('body').removeClass("noScroll");
             		$('html').removeClass('modal-open').css({
             			marginTop: 0,
             			overflow: 'visible',
             			left: 'auto',
             			right: 'auto',
             			top: 'auto',
             			bottom: 'auto',
             			position: 'static',
             		});
 					if( previousScrollY > 0 ) {
                 		window.scrollTo(0, previousScrollY);
 					}
 				}

 				/**
 				* remove all created quick view elements.
 				* @param _this | object | pass the object that is currently clicked
 				**/
 				function qv_remove_element(_this)
 				{
 					//remove the loading status
 					_this.parent().find(_li_sel_container).remove();
 					//removed all open quick-view-placeholder
 					_this.parent().find(_qv_sel_placeholder).remove();
 				}

 				/**
 				* custom remove un wanted element from woo.
 				* @param _this | object | pass the object that is currently clicked
 				**/
 				function qv_woo_remove_elements(_this)
 				{
 					_this.find('.reset_variations').remove();
 					_this.find('.quantity').hide();
 					_this.find('.variations').css('margin', '0px');
 				}

 				/**
 				* remove the class product in LI.
 				* @param _this | object | pass the object that is currently clicked.
 				* @param _action | string | pass string 'remove' to remove 'add' to add the class.
 				* @param _toggle_class | string | the class need to remove or add.
 				**/
 				function qv_toggle_woo_class(_this, _action, _toggle_class = 'product')
 				{
 					if( _action == 'remove' ){
 						_this.removeClass(_toggle_class);
 					}else if(_action == 'add'){
 						_this.addClass(_toggle_class);
 					}
 				}

 				/**
 				* close the quick view using esc key.
 				* @param _this | object | pass the object that is currently clicked
 				**/
 				function mru_qv_esc(_this)
 				{
 					document.onkeydown = function(evt) {
 					    evt = evt || window.event;
 					    var isEscape = false;
 					    if ("key" in evt) {
 					        isEscape = (evt.key === "Escape" || evt.key === "Esc");
 					    } else {
 					        isEscape = (evt.keyCode === 27);
 					    }
 					    if (isEscape) {
 							_this.find('.close-quick-view').addClass('hidden');
 					        mru_qv_destroy(_this);
 					    }
 					}
 				}

 				function _v1_qv_set_position(_this, _offset, _width, _height)
 				{

 			    var centerX = ((_offset.left + _width) / 2);
 			    var centerY = _offset.top + _height / 2;
 					var _window = $(window);

 					if(_window.width() > 992){
 						var _left_move = _offset.left;
 						if(_offset.left > 1000){
 							_left_move = 850;
 						}
 						_this.parent().find('.quick-view').css({
 				            'left': _left_move,
 				            'width' : '400px',
 				        });
 					}

 				}

 				function _v2_qv_set_position(_this, _centre)
 				{

 					var _window = $(window);
          var _window_width = _window.width();
 				  var $quick_view = _this.parent().find('.quick-view');

 					if(_window_width > 992){
 					    var _left_move = _centre.x - 135;
 				      var _height = $quick_view.height();
 				      var _top_move = _centre.y - (_height/2);

 						$quick_view.css({
		            'left': _left_move,
		            'top' : _top_move
		        });

		        if ( ( $quick_view.offset().left + 270 ) > _window_width ) {
		            var extra = ( $quick_view.offset().left + 270 ) - _window_width;
		            $quick_view.css({
		                'left': $quick_view.position().left - extra - 20, //20px buffer
		            });
		        } else if ( $quick_view.offset().left < 0 ) {
		            $quick_view.css({
		               'left' : 20
		            });
		        }
 					} else {
 			    		previousScrollY = window.scrollY;
                 		$('html').addClass('modal-open').css({
 			                marginTop: -previousScrollY,
                 			overflow: 'hidden',
                 			left: 0,
                 			right: 0,
                 			top: 0,
                 			bottom: 0,
                 			position: 'fixed',
                 		});

 			    		$('body').css('overflow','hidden');
                 		$('body').addClass("noScroll");
 					}

 			        $quick_view.addClass("show");

 				}


 				function qv_set_position(_this, _current_offset)
 				{
 					if(_window.width() > 992){
 						//_this.find('.quick-view').css('width', '400px');
 						var _left = Math.ceil(_current_offset.left);
 						//var _right = Math.ceil(_current_offset.right);
 						var _top = Math.ceil(_current_offset.top);
 						//console.log('top ' + _top);
 						//console.log('right ' + _right);
 						//console.log('left ' + _left);
 						//_this.find('.quick-view').css('left', Math.ceil(_offset_current.left) + 'px');
 						_this.find('.quick-view').css({
 							'width' : '400px',
 							'right' : _left + 'px'
 						});
 					}
 				}

 				function qv_variation_change()
 				{
 					$( ".mru-quickview-product-ajax-info .single_variation_wrap" ).on( "show_variation", function ( event, variation ) {
 							// Fired when the user selects all the required dropdowns / attributes
 							// and a final variation is selected / shown
 							//console.log( variation );
 							var product_id = $('input[name=product_id]').val();
 							//console.log( product_id );
 							//console.log( '.summary-content-product-'+product_id+' .price' );
 							if(variation.variation_id){
 								$('.post-'+product_id+' .price').find('.js-append-amount').remove();
 								$('.post-'+product_id+' .price').append('<span class="js-append-amount"></span>');
 								$('.post-'+product_id+' .woocommerce-variation-price').hide();
 								$('.post-'+product_id+' .price del').hide();
 								$('.post-'+product_id+' .price ins').hide();
 								$('.post-'+product_id+' .woocommerce-Price-amount').hide();
 								$('.post-'+product_id+' .quantity').show();
 								$('.post-'+product_id+' .price').find('.js-append-amount').html(mru_settings.current_currency_symbol + variation.display_price);
 								$('.post-'+product_id+' .variation-product-price-label').hide();
 							}
 					});
 					$('.mru-quickview-product-ajax-info .variations_form').find('select').change(function() {
 						var product_id = $('input[name=product_id]').val();
 						console.log( product_id );
 						var _selec_val = $(this).val();
 						if(_selec_val == ''){
 							$('.post-'+product_id+' .price del').show();
 							$('.post-'+product_id+' .price ins').show();
 							$('.post-'+product_id+' .woocommerce-Price-amount').show();
 							$('.post-'+product_id+' .price .js-append-amount').remove();
 							$('.post-'+product_id+' .quantity').hide();
 							$('.post-'+product_id+' .variation-product-price-label').show();
 						}
 						//var _selec_val = $(this).val();
 						//console.log(_selec_val);
 					})
 					$('.mru-quickview-product-ajax-info .reset_variations').on('click', function(){
 						$('.mru-quickview-product-ajax-info .price del').show();
 						$('.mru-quickview-product-ajax-info .price ins').show();
 						$('.mru-quickview-product-ajax-info .price .js-append-amount').remove();
 				  });
 				}

 				//click event for the li only
 				//_li_product.on('click', function(e){
 				//use the body after the ajax load.
 				$('body').on('click tap',  'li.product', function(e){
 					//e.preventDefault();
 					//get the current target and make sure we only trigger base on clicked title or within the li box
 					//and not on the quick view popup or the information
 					var target = $( e.target );
 					if (
 						target.is( "h3" )
 						|| target.is( "img" )
 						|| target.is( "span.woocommerce-Price-amount.amount" )
 						|| target.is( "span.title-variation" )
 						|| target.is( ".quick-view-link-container")
 					){

     					e.preventDefault();
     					$("body").append("<div id='background_cover' onClick=''></div>");
     					//shortcut to selector $this
     					 var _this = $(this);
     					 var _this_offset = _this.offset();
     					 var _this_position = _this.position();
	 			       var _this_width = _this.outerWidth(); //css( "width" )
	 			       var _this_height = _this.height();
	             var _this_float = _this.css("float");
	             var _this_clear = _this.css("clear");

	             var _this_centre = {
	                 x : _this_position.left + (_this_width / 2 ),
	                 y : _this_position.top + (_this_height / 2 )
	             };


     					//var _offset_current = $(_this).position();
     					//initialize the product id data attribute
     					var _product_id = _this.data('product-id');
     					//console.log(_product_id);

     					_this.parent().find('li').addClass('product');

     					//get the current index clicked
     					var _get_index = _this.index();

     					//remove the quick-view class
     					mru_qv_remove_class(_this);

     					//add the quickview loading class
     					mru_qv_add_loading_class(_this);

     					//remove all open quick view class
     					qv_remove_element(_this);

     					//create the data to be pass on the ajax
     					// uses wp ajax hook see wp_ajax_mru_get_product
     					var data = [
      						{name: 'action', value: 'mru_get_product'},
      						{name: 'product_id', value: _product_id},
      					];

     					//let the user know that ajax is working
     					append_info(_this, '<p class="quick-view-loading-info">Getting Information please wait...</p>');

     					// the ajax call
     					$.ajax({
      						type: "POST",
      						url: wc_add_to_cart_params.ajax_url,
      						data: data,
      					}).done(function( data ) {
									console.log(data);
     						//remove the product class
     	 			    qv_toggle_woo_class(_this, 'remove');
     						//add the quickview class
      				    mru_qv_add_class(_this);
       					//create empty LI
       					create_after_li(_this, '');
       					$(_qv_sel_placeholder).height(_this_height).css("float", _this_float).css("clear", _this_clear );
     						//remove the loading status
     						_this.parent().find(_li_sel_container).remove();
                 $('.loading').remove();
     						//append the data in the current li
     						append_info(_this, data);

     						//	_v1_qv_set_position(_this, _this_offset, _this_width, _this_height);
     						_v2_qv_set_position(_this, _this_centre);

     						$("#primary").append($(".product-chart-modal"));
     						qv_woo_remove_elements(_this);
     						//remove all open quick-view class
     						mru_qv_add_class(_this);
     						//alert the user to choose variations if there is
     						mru_qv_single_add_to_cart_button();
     						//when the user clear selection in the variations dropdown
     						mru_qv_reset_variations();
     						//inittialize the close button
     						mru_qv_close(_this);
     						mru_qv_esc(_this);
 								qv_variation_change();

      					});
 					}else{
 						return true;
 					}//if target.is h3


 				});
 			}//init
 		};
 	}();

 	$(window).load(function(){
 		//initialize the js
 		quickview.init();
  });

})( jQuery );
