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
function portfolio_blocks_render_work( $attributes, $content ) {
	$block_screenshot_id = ( $attributes['screenshotID'] ) ? $attributes['screenshotID'] : '';
	$block_screenshot = ( $attributes['screenshot'] ) ? $attributes['screenshot'] : '';
	$block_screenshot_alt = ( $attributes['screenshotAlt'] ) ? $attributes['screenshotAlt'] : '';
	$classes = 'wp-block-portfolio-blocks-work';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div class="work">
			<div class="work__content">
				<?php echo $content; ?>
			</div>
			<div class="work__image">
				<div class="work__iphone">
					<?php echo file_get_contents( plugin_dir_path( __FILE__ ) . 'assets/iphone-black.svg' ); ?>
				</div>
				<div class="work__screenshot">
					<img src="<?php echo esc_url( $block_screenshot ); ?>" alt="<?php echo esc_attr( $block_screenshot_alt ); ?>" />
				</div>
			</div>
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
function portfolio_blocks_register_work() {
	register_block_type(
		'portfolio-blocks/work',
		array(
			'attributes' => array(
				'screenshotID' => array(
					'type' => 'integer',
				),
				'screenshot' => array(
					'type' => 'string',
				),
				'screenshotAlt' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'portfolio_blocks_render_work',
		)
	);
}
add_action( 'init', 'portfolio_blocks_register_work' );
