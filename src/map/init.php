<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package Portfolio Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render Map block on frontend.
 *
 * @since 1.0.0
 *
 * @param array $attributes {
 *     @type string className The class defined in the Map block
 *     @type string address   The address displayed in the Map block
 * }
 */
function portfolio_blocks_render_map( $attributes ) {
	$block_address = ( $attributes['address'] ) ? $attributes['address'] : '';
	$classes = 'wp-block-portfolio-blocks-map';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div id="map" class="map"></div>
	</div>
	<?php
	$html = ob_get_clean();

	return $html;
}

/**
 * Register Map Gutenberg block.
 *
 * @since 1.0.0
 */
function portfolio_blocks_register_map() {
	register_block_type(
		'portfolio-blocks/map',
		array(
			'attributes' => array(
				'address' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'portfolio_blocks_render_map',
		)
	);
}
add_action( 'init', 'portfolio_blocks_register_map' );
