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
 * Render Archive Content block on frontend.
 *
 * @since 1.0.0
 *
 * @param array $attributes {
 *     @type string className The class defined in the Archive Content block
 *     @type string headline  The headline displayed in the Archive Content block
 *     @type string subhead   The subhead displayed in the Archive Content block
 *     @type string postType  The post type displayed in the Archive Content block
 * }
 */
function portfolio_blocks_render_hero( $attributes, $content ) {
	$block_heading = ( $attributes['heading'] ) ? $attributes['heading'] : '';
	$classes = 'wp-block-portfolio-blocks-hero';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div class="hero">
			<div class="hero__content">
				<h1><?php echo esc_html( $block_heading ); ?></h1>
				<?php echo $content; ?>
			</div>
		</div>
		<div class="ranking">
			<svg height="120" width="100%">
				<line x1="0" y1="112" x2="16.666%" y2="71" style="stroke: #383838; stroke-width: 4" />
				<circle cx="0" cy="111" r="7" style="stroke: #383838; stroke-width: 4" fill="#ffffff" />
				<line x1="16.666%" y1="71" x2="33.333%" y2="81" style="stroke: #383838; stroke-width: 4" />
				<circle cx="16.666%" cy="71" r="7" style="stroke: #383838; stroke-width: 4" fill="#ffffff" />
				<line x1="33.333%" y1="81" x2="50%" y2="70" style="stroke: #383838; stroke-width: 4" />
				<circle cx="33.333%" cy="81" r="7" style="stroke: #383838; stroke-width: 4" fill="#ffffff" />
				<line x1="50%" y1="70" x2="66.666%" y2="31" style="stroke: #383838; stroke-width: 4" />
				<circle cx="50%" cy="69" r="7" style="stroke: #383838; stroke-width: 4" fill="#ffffff" />
				<line x1="66.666%" y1="31" x2="83.333%" y2="36" style="stroke: #383838; stroke-width: 4" />
				<circle cx="66.666%" cy="30" r="7" style="stroke: #383838; stroke-width: 4" fill="#ffffff" />
				<line x1="83.333%" y1="36" x2="100%" y2="11" style="stroke: #383838; stroke-width: 4" />
				<circle cx="83.333%" cy="35" r="7" style="stroke: #383838; stroke-width: 4" fill="#ffffff" />
				<circle cx="100%" cy="10" r="7" style="stroke: #383838; stroke-width: 4" fill="#ffffff" />
			</svg>
		</div>
	</div>
	<?php
	$html = ob_get_clean();

	return $html;
}

/**
 * Register all dynamic Gutenberg blocks.
 *
 * @since 1.0.0
 */
function portfolio_blocks_register_hero() {
	register_block_type(
		'portfolio-blocks/hero',
		array(
			'attributes' => array(
				'heading' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'portfolio_blocks_render_hero',
		)
	);
}
add_action( 'init', 'portfolio_blocks_register_hero' );
