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
 * Render Page Heading block on frontend.
 *
 * @since 1.0.0
 *
 * @param array $attributes {
 *     @type string className         The class defined in the Page Heading block
 *     @type string heading           The heading displayed in the Page Heading block
 *     @type string headingBackground The text displayed behind the heading in the Page Heading block
 * }
 */
function portfolio_blocks_render_page_heading( $attributes ) {
	$block_heading = ( $attributes['heading'] ) ? $attributes['heading'] : '';
	$block_heading_background = ( $attributes['headingBackground'] ) ? $attributes['headingBackground'] : '';
	$classes = 'wp-block-portfolio-blocks-page-heading';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div class="page-heading">
			<div class="page-heading__content">
				<span><?php echo esc_html( $block_heading_background ); ?></span>
				<h1><?php echo esc_html( $block_heading ); ?></h1>
			</div>
		</div>
	</div>
	<?php
	$html = ob_get_clean();

	return $html;
}

/**
 * Register Page Heading Gutenberg block.
 *
 * @since 1.0.0
 */
function portfolio_blocks_register_page_heading() {
	register_block_type(
		'portfolio-blocks/page-heading',
		array(
			'attributes' => array(
				'heading' => array(
					'type' => 'string',
				),
				'headingBackground' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'portfolio_blocks_render_page_heading',
		)
	);
}
add_action( 'init', 'portfolio_blocks_register_page_heading' );
