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
 * Render Blurb block on frontend.
 *
 * @since 1.0.0
 *
 * @param array $attributes {
 *     @type string className The class defined in the Blurb block
 *     @type string heading   The heading displayed in the Blurb block
 *     @type string color     The backgrond color for the Blurb block
 * }
 */
function portfolio_blocks_render_blurb( $attributes, $content ) {
	$block_heading = ( $attributes['heading'] ) ? $attributes['heading'] : '';
	$block_color = ( $attributes['color'] ) ? $attributes['color'] : '';
	$classes = 'wp-block-portfolio-blocks-blurb';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>" style="background-color: <?php echo esc_attr( $block_color ); ?>">
		<div class="blurb">
			<div class="blurb__content">
				<h2><?php echo $block_heading; ?></h2>
				<hr />
				<?php echo $content; ?>
			</div>
		</div>
	</div>
	<?php
	$html = ob_get_clean();

	return $html;
}

/**
 * Register Blurb Gutenberg block.
 *
 * @since 1.0.0
 */
function portfolio_blocks_register_blurb() {
	register_block_type(
		'portfolio-blocks/blurb',
		array(
			'attributes' => array(
				'heading' => array(
					'type' => 'string',
				),
				'color' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'portfolio_blocks_render_blurb',
		)
	);
}
add_action( 'init', 'portfolio_blocks_register_blurb' );
